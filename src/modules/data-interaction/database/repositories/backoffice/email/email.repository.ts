import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectSendGrid, SendGridService } from "@ntegral/nestjs-sendgrid";
import { EnviromentVariablesEnum } from "src/core/enums/environment-variables.enum";

@Injectable()
export class EmailRepository {
  constructor(
    @InjectSendGrid() private readonly _client: SendGridService,
    private readonly _configService: ConfigService,
  ) { }
  async send(
    to: string | string[],
    subject: string,
    text: string,
    html: string,
  ) {
    await this._client.send({
      to,
      from: this._configService.get(
        EnviromentVariablesEnum.SENDGRID_EMAIL_SENDER,
      ),
      subject,
      text,
      html,
    });
  }
  async sendProfessionalNotFound(params: {
    neighborhood: string;
    city: string;
    state: string;
    latitude: number | string;
    longitude: number | string;
  }) {
    const { neighborhood, city, state, latitude, longitude } = params;
    const subject = 'App Melhoria - Profissional não localizado';
    const text = [
      'Foi identificada demanda para atendimento no endereço a seguir:',
      `${neighborhood}, ${city} - ${state}`,
      `Latitude: ${latitude}`,
      `Longitude: ${longitude}`,
      'Não foram localizados profissionais cadastrados na região.',
    ].join('\n');
    const html = `
      <p>Foi identificada demanda para atendimento no endereço a seguir:</p>
      <p><strong>${neighborhood}, ${city} - ${state}</strong></p>
      <p>Latitude: ${latitude}<br>Longitude: ${longitude}</p>
      <p><em>Não foram localizados profissionais cadastrados na região.</em></p>
    `;
    await this.send(
      ['pmh@caubr.gov.br', 'moradia@confea.org.br'],
      subject,
      text,
      html,
    );
  }
}
