import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Injectable()
export class SendGridSubsystem {
    sendGridClient = new MailService();

    constructor(private readonly configService: ConfigService) {
        this.sendGridClient.setApiKey(this.configService.get(EnviromentVariablesEnum.SENDGRID_API_KEY));
    }

    async sendPasswordResetCodeEmail(code: string, userEmail: string) {
        const message = {
            to: userEmail,
            from: this.configService.get(EnviromentVariablesEnum.SENDGRID_EMAIL_SENDER),
            subject: 'Recuperação de senha',
            text: `Seu código de recuperação de senha é: ${code}`,
            html: `<strong>Seu código de recuperação de senha é: ${code}</strong>`,
        };

        return this.sendGridClient.send(message);
    }

    async sendProfessionalNotFoundEmail(params: {
        neighborhood: string;
        city: string;
        state: string;
        latitude: number | string;
        longitude: number | string;
    }) {
        const { neighborhood, city, state, latitude, longitude } = params;
        const message = {
            to: ['pmh@caubr.gov.br', 'moradia@confea.org.br'],
            from: this.configService.get(
                EnviromentVariablesEnum.SENDGRID_EMAIL_SENDER,
            ),
            subject: 'App Melhoria - Profissional não localizado',
            text: [
                'Foi identificada demanda para atendimento no endereço a seguir:',
                `${neighborhood}, ${city} - ${state}`,
                `Latitude: ${latitude}`,
                `Longitude: ${longitude}`,
                'Não foram localizados profissionais cadastrados na região.',
            ].join('\n'),
            html: `
      <p>Foi identificada demanda para atendimento no endereço a seguir:</p>
      <p><strong>${neighborhood}, ${city} - ${state}</strong></p>
      <p>Latitude: ${latitude}<br>Longitude: ${longitude}</p>
      <p><em>Não foram localizados profissionais cadastrados na região.</em></p>
    `,
        };
        await this.sendGridClient.send(message);
    }
}
