import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/modules/data-interaction/database/entitites/user.entity";
import { GovbrSsoRepository } from "src/modules/data-interaction/database/repositories/govbr-sso.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { GovbrFacade } from "src/modules/data-interaction/facade/apis/gov/govbr/govbr.facade";
import { GovbrTokenPayloadDto } from "./dtos/govbr-token-payload.dto";
import { SigninRequestDto } from "./dtos/signin-request.dto";
import { SigninResponseDto } from "./dtos/signin-response.dto";
import { CompanyRepository } from "src/modules/data-interaction/database/repositories/company/company.repository";
export declare class FeatureAuthService {
    private govbrFacade;
    private userRepository;
    private companyRepository;
    private jwtService;
    private govbrSsoRepository;
    private configService;
    constructor(govbrFacade: GovbrFacade, userRepository: UserRepository, companyRepository: CompanyRepository, jwtService: JwtService, govbrSsoRepository: GovbrSsoRepository, configService: ConfigService);
    generateSsoGovbr(): Promise<import("../../data-interaction/database/entitites/govbr-sso.entity").GovbrSsoEntity>;
    getSsoId(id: string): Promise<SigninResponseDto>;
    govbrAuthorize(dto: SigninRequestDto): Promise<string>;
    govbrGetTokens(dto: GovbrTokenPayloadDto): Promise<void>;
    signinFromCreateUser(user: UserEntity): Promise<SigninResponseDto>;
}
