import { Injectable } from '@nestjs/common';
import { SendGridSubsystem } from './aws.subsystem';

@Injectable()
export class EmailFacade {
    constructor(private readonly sendGridSubsystem: SendGridSubsystem) {}

    async getProfessionalRegistrationStatusFromCaub(code: string, userEmail: string) {
        return this.sendGridSubsystem.sendPasswordCodeEmail(code, userEmail);
    }
}
