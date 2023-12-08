import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Injectable()
export class SendGridSubsystem {
    sendGridClient: MailService;

    constructor(private readonly configService: ConfigService) {
        this.sendGridClient.setApiKey(this.configService.get(EnviromentVariablesEnum.SENDGRID_API_KEY));
    }

    async sendPasswordCodeEmail(code: string, userEmail: string) {
        const message = {
            to: userEmail,
            from: this.configService.get(EnviromentVariablesEnum.SENDGRID_EMAIL_SENDER),
            subject: 'Recuperação de senha',
            text: `Seu código de recuperação de senha é: ${code}`,
            html: `<strong>Seu código de recuperação de senha é: ${code}</strong>`,
        };

        return this.sendGridClient.send(message);
    }
}
