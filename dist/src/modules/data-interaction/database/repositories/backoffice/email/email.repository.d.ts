import { ConfigService } from "@nestjs/config";
import { SendGridService } from "@ntegral/nestjs-sendgrid";
export declare class EmailRepository {
    private readonly _client;
    private readonly _configService;
    constructor(_client: SendGridService, _configService: ConfigService);
    send(to: string, subject: string, text: string, html: string): Promise<void>;
}
