import { SendGridSubsystem } from './send-grid.subsystem';
export declare class EmailFacade {
    private readonly sendGridSubsystem;
    constructor(sendGridSubsystem: SendGridSubsystem);
    sendPasswordResetCodeEmail(code: string, userEmail: string): Promise<[import("@sendgrid/mail").ClientResponse, {}]>;
}
