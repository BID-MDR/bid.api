import { SigninRequestDto } from './dtos/signin-request.dto';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { FeatureAuthService } from './feature-auth.service';
import { GetSsoRequestDto } from './dtos/get-sso-request.dto';
import { ResponseDto } from 'src/core/dtos/response.dto';
export declare class FeatureAuthController {
    private featureAuthService;
    constructor(featureAuthService: FeatureAuthService);
    getSsoId(dto: GetSsoRequestDto): Promise<ResponseDto<SigninResponseDto>>;
    signin(body: SigninRequestDto): Promise<ResponseDto<string>>;
    signinGet(body: SigninRequestDto): Promise<ResponseDto<string>>;
    generateSsoGovbr(): Promise<ResponseDto<import("../../data-interaction/database/entitites/govbr-sso.entity").GovbrSsoEntity>>;
}
