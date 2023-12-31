import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Injectable()
export class GovbrSubsystem {
    constructor(private readonly configService: ConfigService, private httpService: HttpService) {}

    async login(code: string, codeVerifier: string) {
        await firstValueFrom(
            this.httpService.post(
                `https://sso.staging.acesso.gov.br/token?grant_type=authorization_code&code=${code}&redirect_uri=${decodeURIComponent(
                    this.configService.get(EnviromentVariablesEnum.API_URL) +
                        this.configService.get(EnviromentVariablesEnum.SERVER_PATH_PREFIX) +
                        '/v' +
                        this.configService.get(EnviromentVariablesEnum.APP_VERSION) +
                        '/auth/govbr/callback',
                )}&code_verifier=${codeVerifier})`,
            ),
        );
    }

    async getJwk() {
        return (await firstValueFrom(this.httpService.get('https://sso.staging.acesso.gov.br/jwk'))).data.keys[0];
    }
}
