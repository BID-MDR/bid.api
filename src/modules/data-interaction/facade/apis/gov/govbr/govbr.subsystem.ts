import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { GovbrTokenPayloadDto } from 'src/modules/business-logic/feature-auth/dtos/govbr-token-payload.dto';

@Injectable()
export class GovbrSubsystem {
    constructor(
        private readonly configService: ConfigService,
        private httpService: HttpService,
    ) {}

    async login(code: string, codeVerifier: string) {
        return (
            await firstValueFrom(
                this.httpService.post<GovbrTokenPayloadDto>(
                    `https://sso.staging.acesso.gov.br/token?grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(
                        this.configService.get(EnviromentVariablesEnum.API_URL) +
                            this.configService.get(EnviromentVariablesEnum.SERVER_PATH_PREFIX) +
                            '/govbr/sso',
                    )}&code_verifier=${codeVerifier}`,
                    undefined,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: `Basic ${Buffer.from(
                                this.configService.get(EnviromentVariablesEnum.GOVBR_CLIENT_ID) +
                                    ':' +
                                    this.configService.get(EnviromentVariablesEnum.GOVBR_CLIENT_SECRET),
                            ).toString('base64')}`,
                        },
                    },
                ),
            )
        ).data;
    }

    async getJwk() {
        return (await firstValueFrom(this.httpService.get('https://sso.staging.acesso.gov.br/jwk'))).data.keys[0];
    }
}
