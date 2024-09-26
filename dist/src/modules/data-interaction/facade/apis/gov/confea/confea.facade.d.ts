import { ConfeaSubsystem } from './confea.subsystem';
export declare class ConfeaFacade {
    private readonly caubSubsystem;
    constructor(caubSubsystem: ConfeaSubsystem);
    getProfessionalRegistrationStatusFromConfea(cpf: string): Promise<{
        registered: boolean;
        active: boolean;
        registryNumber: string;
    }>;
}
