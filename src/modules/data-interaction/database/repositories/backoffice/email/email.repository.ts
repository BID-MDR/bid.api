import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectSendGrid, SendGridService } from "@ntegral/nestjs-sendgrid";
import { EnviromentVariablesEnum } from "src/core/enums/environment-variables.enum";

@Injectable()
export class EmailRepository {
  constructor(
    @InjectSendGrid() private readonly _client: SendGridService,
    private readonly _configService: ConfigService,
  ) {}

  async send(to: string, subject: string, text: string, html: string) {
    const msg = {
      to,
      from: this._configService.get(
        EnviromentVariablesEnum.SENDGRID_EMAIL_SENDER,
      ),
      subject,
      text,
      html,
    };

    await this._client.send(msg);
  }
}
