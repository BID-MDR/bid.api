import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class ConfeaSubsystem {
    private readonly configService;
    private readonly httpClient;
    constructor(configService: ConfigService, httpClient: HttpService);
    getProfessionalRegistrationStatusFromConfea(cpf: string): Promise<{
        registered: boolean;
        active: boolean;
        registryNumber: string;
    }>;
}
