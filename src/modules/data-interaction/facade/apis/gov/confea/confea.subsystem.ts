import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import {
    ConfeaProfessionalRegistrationErrorResponse,
    ConfeaProfessionalRegistrationSucessResponse,
} from './interfaces/confea-professional-registration-response.interface';

@Injectable()
export class ConfeaSubsystem {
    constructor(private readonly configService: ConfigService, private readonly httpClient: HttpService) {}

    async getProfessionalRegistrationStatusFromConfea(cpf: string) {
        const response = await firstValueFrom(
            this.httpClient.get<
                ConfeaProfessionalRegistrationErrorResponse | ConfeaProfessionalRegistrationSucessResponse
            >(`${this.configService.get(EnviromentVariablesEnum.CONFEA_ENDPOINT)}/${cpf}`, {
                headers: {
                    tokenAcesso: `Bearer ${this.configService.get(EnviromentVariablesEnum.CONFEA_ACCESS_TOKEN)}`,
                },
            }),
        );

        return {
            registered: 'message' in response.data,
            active: 'message' in response.data,
            registryNumber: 'rnp' in response.data ? response.data.rnp : null,
        };
    }
}
