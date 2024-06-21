import { Injectable } from '@nestjs/common';
import { SendGridSubsystem } from './send-grid.subsystem';

@Injectable()
export class EmailFacade {
    constructor(
        private readonly sendGridSubsystem: SendGridSubsystem,
    ) {}

    async sendPasswordResetCodeEmail(code: string, userEmail: string) {
        return this.sendGridSubsystem.sendPasswordResetCodeEmail(code, userEmail);
    }
}
