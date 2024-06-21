import { Injectable } from '@nestjs/common';
import { CaubSubsystem } from "./caub.subsystem";

@Injectable()
export class CaubFacade {
    constructor(private readonly caubSubsystem: CaubSubsystem) {}

    async getProfessionalRegistrationStatusFromCaub(cpf: string) {
        return this.caubSubsystem.getProfessionalRegistrationStatusFromCaub(cpf);
    }
}
