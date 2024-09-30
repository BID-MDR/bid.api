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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_ok_response_dto_decorator_1 = require("../../../core/decorators/swagger/api-ok-response-dto.decorator");
const encrypt_interceptor_1 = require("../../../core/interceptors/encrypt.interceptor");
const govbr_code_challenge_response_dto_1 = require("./dtos/govbr-code-challenge-response.dto");
const signin_request_dto_1 = require("./dtos/signin-request.dto");
const signin_response_dto_1 = require("./dtos/signin-response.dto");
const feature_auth_service_1 = require("./feature-auth.service");
const get_sso_request_dto_1 = require("./dtos/get-sso-request.dto");
const response_dto_1 = require("../../../core/dtos/response.dto");
let FeatureAuthController = class FeatureAuthController {
    featureAuthService;
    constructor(featureAuthService) {
        this.featureAuthService = featureAuthService;
    }
    async getSsoId(dto) {
        const result = await this.featureAuthService.getSsoId(dto.id);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async signin(body) {
        const result = await this.featureAuthService.govbrAuthorize(body);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async signinGet(body) {
        const result = await this.featureAuthService.govbrAuthorize(body);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async generateSsoGovbr() {
        const result = await this.featureAuthService.generateSsoGovbr();
        return new response_dto_1.ResponseDto(true, result, null);
    }
};
exports.FeatureAuthController = FeatureAuthController;
__decorate([
    (0, common_1.Get)('sso/id/:id'),
    (0, swagger_1.ApiOperation)({
        description: 'Pelo id retorna um jwt e demais informações.',
        summary: 'Retorna os dados de uma tentativa de sso.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        allowEmptyValue: false,
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: signin_response_dto_1.SigninResponseDto,
    }),
    (0, common_1.SerializeOptions)({
        type: signin_response_dto_1.SigninResponseDto,
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_sso_request_dto_1.GetSsoRequestDto]),
    __metadata("design:returntype", Promise)
], FeatureAuthController.prototype, "getSsoId", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiOperation)({
        description: 'Autentica um usuário através do login único govbr e retorna um JWT ou um erro de usuário não cadastrado. Use após redirecionar o usuário para a página de login único govbr.',
        summary: 'Autentica um usuário.',
    }),
    (0, swagger_1.ApiBody)({
        type: signin_request_dto_1.SigninRequestDto,
        required: true,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Usuário não cadastrado.',
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: String,
    }),
    (0, common_1.SerializeOptions)({
        type: String,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_request_dto_1.SigninRequestDto]),
    __metadata("design:returntype", Promise)
], FeatureAuthController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('signin'),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiOperation)({
        description: 'Autentica um usuário através do login único govbr e retorna um JWT ou um erro de usuário não cadastrado. Use após redirecionar o usuário para a página de login único govbr.',
        summary: 'Autentica um usuário.',
    }),
    (0, swagger_1.ApiBody)({
        type: signin_request_dto_1.SigninRequestDto,
        required: true,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Usuário não cadastrado.',
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: String,
    }),
    (0, common_1.SerializeOptions)({
        type: String,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_request_dto_1.SigninRequestDto]),
    __metadata("design:returntype", Promise)
], FeatureAuthController.prototype, "signinGet", null);
__decorate([
    (0, common_1.Get)('govbr/sso'),
    (0, swagger_1.ApiOperation)({
        summary: 'Gera um code_challenge para o login único govbr.',
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: govbr_code_challenge_response_dto_1.GovbrCodeChallengeResponseDto,
    }),
    (0, common_1.SerializeOptions)({
        type: govbr_code_challenge_response_dto_1.GovbrCodeChallengeResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureAuthController.prototype, "generateSsoGovbr", null);
exports.FeatureAuthController = FeatureAuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Authentication/Autenticação'),
    __metadata("design:paramtypes", [feature_auth_service_1.FeatureAuthService])
], FeatureAuthController);
//# sourceMappingURL=feature-auth.controller.js.map