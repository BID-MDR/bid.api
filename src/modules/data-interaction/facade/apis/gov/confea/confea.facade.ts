import { Injectable } from '@nestjs/common';
import { ConfeaSubsystem } from './confea.subsystem';

@Injectable()
export class ConfeaFacade {
    constructor(private readonly caubSubsystem: ConfeaSubsystem) {}

    async getProfessionalRegistrationStatusFromConfea(cpf: string) {
        return this.caubSubsystem.getProfessionalRegistrationStatusFromConfea(cpf);
    }
}
