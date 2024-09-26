import { CaubSubsystem } from "./caub.subsystem";
export declare class CaubFacade {
    private readonly caubSubsystem;
    constructor(caubSubsystem: CaubSubsystem);
    getProfessionalRegistrationStatusFromCaub(cpf: string): Promise<{
        registered: boolean;
        active: boolean;
        registryNumber: any;
    }>;
}
