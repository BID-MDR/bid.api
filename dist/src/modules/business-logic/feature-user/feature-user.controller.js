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
var FeatureUserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_body_encripted_decorator_1 = require("../../../core/decorators/swagger/api-body-encripted.decorator");
const api_ok_response_dto_decorator_1 = require("../../../core/decorators/swagger/api-ok-response-dto.decorator");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const encrypt_interceptor_1 = require("../../../core/interceptors/encrypt.interceptor");
const create_user_dto_1 = require("../../data-interaction/database/dtos/user/create-user.dto");
const reponse_user_dto_1 = require("../../data-interaction/database/dtos/user/reponse-user.dto");
const update_user_dto_1 = require("../../data-interaction/database/dtos/user/update-user.dto");
const confirm_password_update_request_dto_1 = require("./dtos/confirm-password-update.request.dto");
const professional_council_resgistration_reponse_dto_1 = require("./dtos/professional-council-resgistration-reponse.dto");
const professional_council_resgistration_request_dto_1 = require("./dtos/professional-council-resgistration-request.dto");
const token_verify_params_dto_1 = require("./dtos/token-verify-params.dto");
const token_verify_reponse_dto_1 = require("./dtos/token-verify-reponse.dto");
const feature_user_service_1 = require("./feature-user.service");
const feature_auth_service_1 = require("../feature-auth/feature-auth.service");
const signin_response_dto_1 = require("../feature-auth/dtos/signin-response.dto");
const update_user_program_type_dto_1 = require("../../data-interaction/database/dtos/user/update-user-program-type.dto");
const response_dto_1 = require("../../../core/dtos/response.dto");
const update_address_dto_1 = require("../../data-interaction/database/dtos/address/update-address.dto");
const media_upload_dto_1 = require("../../data-interaction/database/dtos/media/media-upload.dto");
let FeatureUserController = FeatureUserController_1 = class FeatureUserController {
    featureUserService;
    featureAuthService;
    _logger = new common_1.Logger(FeatureUserController_1.name);
    constructor(featureUserService, featureAuthService) {
        this.featureUserService = featureUserService;
        this.featureAuthService = featureAuthService;
    }
    async getLogged(req) {
        const userId = req.user.userId;
        const result = await this.featureUserService.findById(userId);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async getAllBeneficiary(req) {
        const result = await this.featureUserService.listBeneficiary();
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async getBeneficiaryByMonth(month) {
        const result = await this.featureUserService.listBeneficiaryByMonth(month);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async getById(userId) {
        const us = await this.featureUserService.findById(userId);
        return new response_dto_1.ResponseDto(true, us, false);
    }
    async create(body) {
        const user = await this.featureUserService.create(body);
        return await this.featureAuthService.signinFromCreateUser(user);
    }
    async updatePasswordRequest(req) {
        const userId = req.user.userId;
        console.log('aq', userId);
        await this.featureUserService.updatePasswordRequest(userId);
    }
    async verifyUpdatePasswordRequest(req, paramDto) {
        const userId = req.user.userId;
        return await this.featureUserService.verifyToken(userId, paramDto.token);
    }
    async confirmUpdatePasswordRequest(req, dto) {
        const userId = req.user.userId;
        return await this.featureUserService.confirmUpdatePasswordRequest(userId, dto);
    }
    async getDashboardDataWithJoinProfessional(userId) {
        const userData = await this.featureUserService.getDashboardDataWithJoinProfessional(userId);
        return userData;
    }
    async getDashboardDataBeneficiary(userId) {
        const userData = await this.featureUserService.getDashboardDataWithJoinBeneficiary(userId);
        return userData;
    }
    async update(req, body) {
        const userId = req.user.userId;
        return await this.featureUserService.update(userId, body);
    }
    async updatePersonalInfo(req, body) {
        const userId = req.user.userId;
        const result = await this.featureUserService.update(userId, body);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async pictureProfile(req, body) {
        const userId = req.user.userId;
        const result = await this.featureUserService.updateProfilePicture(userId, body);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async updateAdrress(body) {
        const result = await this.featureUserService.updateAddress(body);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async updateById(id, body) {
        return await this.featureUserService.updateById(id, body);
    }
    async updateUserProgramType(id, body) {
        return await this.featureUserService.updateUserProgramTypeDto(id, body);
    }
    async checkProfessionalUserCaubRegistration(reqParams) {
        return await this.featureUserService.checkProfessionalUserCaubRegistration(reqParams.cpf);
    }
    async checkProfessionalUserConfeaRegistration(reqParams) {
        return await this.featureUserService.checkProfessionalUserConfeaRegistration(reqParams.cpf);
    }
    async getByCpf(cpf) {
        return await this.featureUserService.getByCpf(cpf);
    }
};
exports.FeatureUserController = FeatureUserController;
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiOperation)({
        description: "Retorna o usuário logado que iniciou a requisição através do JWT no header.",
        summary: "Retorna o usuário logado que iniciou a requisição.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: reponse_user_dto_1.UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    }),
    (0, common_1.SerializeOptions)({
        type: reponse_user_dto_1.UserResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "getLogged", null);
__decorate([
    (0, common_1.Get)("get-beneficiary"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "getAllBeneficiary", null);
__decorate([
    (0, common_1.Get)("get-month-beneficiary/:month"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "getBeneficiaryByMonth", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    (0, swagger_1.ApiOperation)({
        description: "Retorna o usuário e sua agenda, caso exista.",
        summary: "Retorna o usuário pelo ID.",
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID do usuário.",
        required: true,
        allowEmptyValue: false,
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: reponse_user_dto_1.UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    }),
    (0, common_1.SerializeOptions)({
        type: reponse_user_dto_1.UserResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(""),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiOperation)({
        description: "Enpoint único para registrar beneficiário ou profissional.",
        summary: "Cria um usuário de ambos os tipos.",
    }),
    (0, api_body_encripted_decorator_1.ApiBodyEncripted)({
        type: create_user_dto_1.CreateUserDto,
        required: true,
        description: "Usuário a ser criado.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: signin_response_dto_1.SigninResponseDto,
        description: "Token de acesso.",
    }),
    (0, common_1.SerializeOptions)({
        type: signin_response_dto_1.SigninResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("password/update/request"),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiOperation)({
        description: "Cria um código de 6 dígitos e manda para o email cadastrado do usuário que iniciou a requisição.",
        summary: "Método para usuário logado. Inicia a requisição de alteração de senha e envia um código.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: null,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "updatePasswordRequest", null);
__decorate([
    (0, common_1.Post)("password/update/verify/token"),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: "Verifica a validade do código de autenticação informado no parâmetro usando o ID do usuário contido no JWT para identificação no banco.",
        summary: "Método para usuário logado. Verifica a validade do código de alteração de senha.",
    }),
    (0, swagger_1.ApiParam)({
        name: "token",
        description: "Código de autenticação de 6 dígitos.",
        required: true,
        allowEmptyValue: false,
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: token_verify_reponse_dto_1.TokenVerifyReponseDto,
    }),
    (0, common_1.SerializeOptions)({
        type: token_verify_reponse_dto_1.TokenVerifyReponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, token_verify_params_dto_1.TokenVerifyParamsDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "verifyUpdatePasswordRequest", null);
__decorate([
    (0, common_1.Post)("password/update/confirm"),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiOperation)({
        description: "Altera a senha do usuário que iniciou a requisição.",
        summary: "Método para usuário logado. Finaliza a requisição de alteração de senha.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: null,
    }),
    (0, api_body_encripted_decorator_1.ApiBodyEncripted)({
        type: confirm_password_update_request_dto_1.ConfirmPasswordUpdateRequestDto,
        required: true,
        description: "Usuário a ser atualizado.",
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, confirm_password_update_request_dto_1.ConfirmPasswordUpdateRequestDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "confirmUpdatePasswordRequest", null);
__decorate([
    (0, common_1.Get)("dashboard/professional/id/:id"),
    (0, swagger_1.ApiOperation)({
        description: "Retorna os dados necessarios do usuario para o perfil profisional dashboard",
        summary: "Retorna dados do usuario profisional e joins.",
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID do usuário.",
        required: true,
        allowEmptyValue: false,
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: reponse_user_dto_1.UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    }),
    (0, common_1.SerializeOptions)({
        type: reponse_user_dto_1.UserResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "getDashboardDataWithJoinProfessional", null);
__decorate([
    (0, common_1.Get)("dashboard/beneficiary/id/:id"),
    (0, swagger_1.ApiOperation)({
        description: "Retorna os dados necessarios do usuario para o perfil beneficiario dashboard",
        summary: "Retorna dados do usuario beneficiario e joins.",
    }),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID do usuário.",
        required: true,
        allowEmptyValue: false,
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: reponse_user_dto_1.UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    }),
    (0, common_1.SerializeOptions)({
        type: reponse_user_dto_1.UserResponseDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "getDashboardDataBeneficiary", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiOperation)({
        description: "Enpoint único para Atualizar beneficiário ou profissional.",
        summary: "Atualiza um usuário de ambos os tipos.",
    }),
    (0, api_body_encripted_decorator_1.ApiBodyEncripted)({
        type: update_user_dto_1.UpdateUserDto,
        required: true,
        description: "Usuário a ser atualizado.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: reponse_user_dto_1.UserResponseDto,
        description: "Usuário atualizado.",
    }),
    (0, common_1.SerializeOptions)({
        type: reponse_user_dto_1.UserResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('personal-info'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "updatePersonalInfo", null);
__decorate([
    (0, common_1.Put)('picture-profile'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, media_upload_dto_1.MediaUploadDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "pictureProfile", null);
__decorate([
    (0, common_1.Put)('address'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_address_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "updateAdrress", null);
__decorate([
    (0, common_1.Put)("by-id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "updateById", null);
__decorate([
    (0, common_1.Put)("update-user-program-type/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_program_type_dto_1.UpdateUserProgramTypeDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "updateUserProgramType", null);
__decorate([
    (0, common_1.Get)("caubr/check-professional-status/cpf/:cpf"),
    (0, swagger_1.ApiParam)({
        name: "cpf",
        description: "CPF do usuário.",
        required: true,
        allowEmptyValue: false,
    }),
    (0, swagger_1.ApiOperation)({
        description: "Necessário para cadastrar o usuário profissional arquiteto/urbanista na plataforma.",
        summary: "Retorna o status do registro de um cpf no CAUBR.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: professional_council_resgistration_reponse_dto_1.ProfessionalCouncilRegistrationResponseDto,
        description: "Retorna o status do registro do profissional no CAUBR e se existe um registro para o CPF informado.",
    }),
    (0, common_1.SerializeOptions)({
        type: professional_council_resgistration_reponse_dto_1.ProfessionalCouncilRegistrationResponseDto,
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [professional_council_resgistration_request_dto_1.ProfessionalCouncilRegistrationRequestDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "checkProfessionalUserCaubRegistration", null);
__decorate([
    (0, common_1.Get)("confea/check-professional-status/cpf/:cpf"),
    (0, swagger_1.ApiParam)({
        name: "cpf",
        description: "CPF do usuário.",
        required: true,
        allowEmptyValue: false,
    }),
    (0, swagger_1.ApiOperation)({
        description: "Necessário para cadastrar o usuário profissional [Engenheiro Civil, Engenheiro Civil e Ambiental, Tecnólogo em Construção Civil, Tecnólogo em Construção Civil - Edificações] na plataforma.",
        summary: "Retorna o status do registro de um cpf no CONFEA.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: professional_council_resgistration_reponse_dto_1.ProfessionalCouncilRegistrationResponseDto,
        description: "Retorna o status do registro do profissional no CONFEA e se existe um registro para o CPF informado.",
    }),
    (0, common_1.SerializeOptions)({
        type: professional_council_resgistration_reponse_dto_1.ProfessionalCouncilRegistrationResponseDto,
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [professional_council_resgistration_request_dto_1.ProfessionalCouncilRegistrationRequestDto]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "checkProfessionalUserConfeaRegistration", null);
__decorate([
    (0, common_1.Get)("by-cpf/:cpf"),
    __param(0, (0, common_1.Param)("cpf")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureUserController.prototype, "getByCpf", null);
exports.FeatureUserController = FeatureUserController = FeatureUserController_1 = __decorate([
    (0, common_1.Controller)("user"),
    (0, swagger_1.ApiTags)("User/Usuário"),
    __metadata("design:paramtypes", [feature_user_service_1.FeatureUserService,
        feature_auth_service_1.FeatureAuthService])
], FeatureUserController);
//# sourceMappingURL=feature-user.controller.js.map