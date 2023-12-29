import { Injectable } from '@nestjs/common';
import { CaubSubsystem } from "./caub.subsystem";

@Injectable()
export class GovbrFacade {
    constructor(private readonly govbrSubsystem: GovbrSubsystem) {}

    async login() {
        return this.govbrSubsystem.getProfessionalRegistrationStatusFromCaub(cpf);
    }
}
