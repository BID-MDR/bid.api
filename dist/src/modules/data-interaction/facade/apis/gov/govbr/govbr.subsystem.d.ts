import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GovbrTokenPayloadDto } from 'src/modules/business-logic/feature-auth/dtos/govbr-token-payload.dto';
export declare class GovbrSubsystem {
    private readonly configService;
    private httpService;
    constructor(configService: ConfigService, httpService: HttpService);
    login(code: string, codeVerifier: string): Promise<GovbrTokenPayloadDto>;
    getJwk(): Promise<any>;
}
