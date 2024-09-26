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
var UserBackofficeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBackofficeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../core/dtos/response.dto");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const feature_auth_service_1 = require("../../business-logic/feature-auth/feature-auth.service");
const user_service_1 = require("./user.service");
const encrypt_interceptor_1 = require("../../../core/interceptors/encrypt.interceptor");
const create_user_backoffice_dto_1 = require("./dto/create-user-backoffice.dto");
const user_register_password_dto_1 = require("./dto/user-register-password.dto");
let UserBackofficeController = UserBackofficeController_1 = class UserBackofficeController {
    UserService;
    featureAuthService;
    _logger = new common_1.Logger(UserBackofficeController_1.name);
    constructor(UserService, featureAuthService) {
        this.UserService = UserService;
        this.featureAuthService = featureAuthService;
    }
    async getUsers() {
        const result = await this.UserService.findAll();
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async getUser(id) {
        const result = await this.UserService.findById(id);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async getUserEmail(email) {
        const result = await this.UserService.getByEmail(email);
        return new response_dto_1.ResponseDto(true, result, null);
    }
    async getAuthenticated(request) {
        const response = await this.UserService.getByPayload(request.user);
        return new response_dto_1.ResponseDto(true, response, null);
    }
    async create(body) {
        return await this.UserService.create(body);
    }
    async firstAccess(_id, dto) {
        const response = await this.UserService.firstAccess(_id, dto);
        return new response_dto_1.ResponseDto(true, response, null);
    }
    async update(id, body) {
        return await this.UserService.update(id, body);
    }
    async delete(id) {
        return await this.UserService.hardDelete(id);
    }
};
exports.UserBackofficeController = UserBackofficeController;
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserBackofficeController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)("by-id/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserBackofficeController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)("by-email/:email"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserBackofficeController.prototype, "getUserEmail", null);
__decorate([
    (0, common_1.Get)("authenticated"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserBackofficeController.prototype, "getAuthenticated", null);
__decorate([
    (0, common_1.Post)(""),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_backoffice_dto_1.CreateUserBackofficeDto]),
    __metadata("design:returntype", Promise)
], UserBackofficeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('first-access/:_id'),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_register_password_dto_1.UserRegisterPasswordDto]),
    __metadata("design:returntype", Promise)
], UserBackofficeController.prototype, "firstAccess", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_backoffice_dto_1.CreateUserBackofficeDto]),
    __metadata("design:returntype", Promise)
], UserBackofficeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserBackofficeController.prototype, "delete", null);
exports.UserBackofficeController = UserBackofficeController = UserBackofficeController_1 = __decorate([
    (0, common_1.Controller)("backoffice-user"),
    (0, swagger_1.ApiTags)("Usuário Backoffice"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        feature_auth_service_1.FeatureAuthService])
], UserBackofficeController);
//# sourceMappingURL=user.controller.js.map