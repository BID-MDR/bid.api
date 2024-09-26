import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';
export declare class SendGridSubsystem {
    private readonly configService;
    sendGridClient: MailService;
    constructor(configService: ConfigService);
    sendPasswordResetCodeEmail(code: string, userEmail: string): Promise<[import("@sendgrid/mail").ClientResponse, {}]>;
}
