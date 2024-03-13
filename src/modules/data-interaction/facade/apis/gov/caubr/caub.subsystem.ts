import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Soap from 'soap';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { CaubProfessionalRegistrationResponse } from './interfaces/caub-professional-registration-response.interface';

@Injectable()
export class CaubSubsystem {
    soapClient: Soap.Client;

    constructor(private readonly configService: ConfigService) {
        Soap.createClientAsync(this.configService.get<string>(EnviromentVariablesEnum.CAUB_SOAP_URL)).then((client) => {
            this.soapClient = client;
        });
    }

    async getProfessionalRegistrationStatusFromCaub(cpf: string) {
        const result: CaubProfessionalRegistrationResponse = (
            await this.soapClient.ConvenioSNH_PesquisarProfissionalAsync({
                cpf,
                senha: this.configService.get<string>(EnviromentVariablesEnum.CAUB_SOAP_PASSWORD),
            })
        )[0];
        return {
            registered: result.retorno.existe.$value,
            active: result.retorno.existe.$value && result.retorno.situacao_cau.$value.toUpperCase() === 'ATIVO',
            registryNumber: null,
        };
    }
}
