import { Injectable } from '@nestjs/common';
import { SendGridSubsystem } from './send-grid.subsystem';

@Injectable()
export class EmailFacade {
    constructor(private readonly sendGridSubsystem: SendGridSubsystem) {}

    async getProfessionalRegistrationStatusFromCaub(code: string, userEmail: string) {
        return this.sendGridSubsystem.sendPasswordCodeEmail(code, userEmail);
    }
}
