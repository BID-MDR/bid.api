"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureAuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const environment_variables_enum_1 = require("../../../core/enums/environment-variables.enum");
const crypto_util_1 = __importDefault(require("../../../core/utils/crypto.util"));
const govbr_sso_info_to_register_entity_1 = require("../../data-interaction/database/entitites/govbr-sso-info-to-register.entity");
const govbr_sso_repository_1 = require("../../data-interaction/database/repositories/govbr-sso.repository");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
const govbr_facade_1 = require("../../data-interaction/facade/apis/gov/govbr/govbr.facade");
const signin_response_dto_1 = require("./dtos/signin-response.dto");
const company_repository_1 = require("../../data-interaction/database/repositories/company/company.repository");
let FeatureAuthService = class FeatureAuthService {
    govbrFacade;
    userRepository;
    companyRepository;
    jwtService;
    govbrSsoRepository;
    configService;
    constructor(govbrFacade, userRepository, companyRepository, jwtService, govbrSsoRepository, configService) {
        this.govbrFacade = govbrFacade;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.jwtService = jwtService;
        this.govbrSsoRepository = govbrSsoRepository;
        this.configService = configService;
    }
    async generateSsoGovbr() {
        const pkce_lib = await import("pkce-challenge");
        const pkce = await pkce_lib.default();
        return await this.govbrSsoRepository.create({
            codeVerifier: pkce.code_verifier,
            codeChallenge: pkce.code_challenge,
        });
    }
    async getSsoId(id) {
        const ssoAttempt = await this.govbrSsoRepository.findById(id);
        var token = "";
        if (!ssoAttempt) {
            throw new common_1.NotFoundException("Tentativa de SSO não encontrada.");
        }
        if (ssoAttempt.infoToRegister) {
            token = ssoAttempt.token;
        }
        else {
            token = crypto_util_1.default.decrypt(this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.OTP_TOKEN), ssoAttempt.token);
        }
        const returnData = new signin_response_dto_1.SigninResponseDto(token, ssoAttempt.registered, ssoAttempt.infoToRegister);
        await this.govbrSsoRepository.hardDelete(id);
        return returnData;
    }
    async govbrAuthorize(dto) {
        console.log('tetsetste');
        console.log(dto);
        const ssoAttempt = await this.govbrSsoRepository.findById(dto.state);
        console.log('ssoAttempt', ssoAttempt);
        if (!ssoAttempt) {
            throw new common_1.BadRequestException("State invalidado pelo backend.");
        }
        const govbrData = await this.govbrFacade.login(dto.code, ssoAttempt.codeVerifier);
        console.log('govbrData', govbrData);
        const jwk = await this.govbrFacade.getJwk();
        const decodedJwt = this.jwtService.decode(govbrData.id_token);
        const user = await this.userRepository.findByCpf(decodedJwt.sub);
        if (!user) {
            ssoAttempt.token = govbrData.id_token;
            ssoAttempt.infoToRegister = new govbr_sso_info_to_register_entity_1.GovbrSsoInfoToRegisterEntity(decodedJwt.name, decodedJwt.sub, decodedJwt.email, decodedJwt.phone_number);
            await ssoAttempt.save();
            return ssoAttempt.id;
        }
        const company = await this.companyRepository.getByEmployee(user.id);
        if (company) {
            var token = await this.jwtService.signAsync({
                userId: user.id,
                userType: user.type,
                companyId: company.id,
            });
        }
        else {
            var token = await this.jwtService.signAsync({
                userId: user.id,
                userType: user.type,
            });
        }
        await this.govbrSsoRepository.update(ssoAttempt.id, {
            token: crypto_util_1.default.encrypt(this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.OTP_TOKEN), token),
            registered: true,
        });
        return ssoAttempt.id;
    }
    async govbrGetTokens(dto) { }
    async signinFromCreateUser(user) {
        return new signin_response_dto_1.SigninResponseDto(await this.jwtService.signAsync({
            userId: user.id,
            userType: user.type,
        }), true);
    }
};
exports.FeatureAuthService = FeatureAuthService;
exports.FeatureAuthService = FeatureAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [govbr_facade_1.GovbrFacade,
        user_repository_1.UserRepository,
        company_repository_1.CompanyRepository,
        jwt_1.JwtService,
        govbr_sso_repository_1.GovbrSsoRepository,
        config_1.ConfigService])
], FeatureAuthService);
//# sourceMappingURL=feature-auth.service.js.map