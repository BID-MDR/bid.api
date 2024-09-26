import { ConfigService } from '@nestjs/config';
import * as Soap from 'soap';
export declare class CaubSubsystem {
    private readonly configService;
    soapClient: Soap.Client;
    constructor(configService: ConfigService);
    getProfessionalRegistrationStatusFromCaub(cpf: string): Promise<{
        registered: boolean;
        active: boolean;
        registryNumber: any;
    }>;
}
