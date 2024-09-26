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
var UserRoleBackofficeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleBackofficeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const feature_auth_service_1 = require("../../business-logic/feature-auth/feature-auth.service");
const user_roles_service_1 = require("./user-roles.service");
const create_role_backoffice_dto_1 = require("./dto/create-role-backoffice.dto");
let UserRoleBackofficeController = UserRoleBackofficeController_1 = class UserRoleBackofficeController {
    UserRoleService;
    featureAuthService;
    _logger = new common_1.Logger(UserRoleBackofficeController_1.name);
    constructor(UserRoleService, featureAuthService) {
        this.UserRoleService = UserRoleService;
        this.featureAuthService = featureAuthService;
    }
    async register(dto) {
        let role = await this.UserRoleService.findByName(dto.role);
        if (role)
            throw new common_1.BadRequestException("Role ja existe");
        else
            return await this.UserRoleService.create(dto);
    }
    async list() {
        return await this.UserRoleService.list();
    }
    async activeEmployee(id) {
        return await this.UserRoleService.activeRole(id);
    }
    async delete(id) {
        return await this.UserRoleService.hardDelete(id);
    }
};
exports.UserRoleBackofficeController = UserRoleBackofficeController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_backoffice_dto_1.CreateUserBackofficeRoleDto]),
    __metadata("design:returntype", Promise)
], UserRoleBackofficeController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserRoleBackofficeController.prototype, "list", null);
__decorate([
    (0, common_1.Put)("active-role/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoleBackofficeController.prototype, "activeEmployee", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoleBackofficeController.prototype, "delete", null);
exports.UserRoleBackofficeController = UserRoleBackofficeController = UserRoleBackofficeController_1 = __decorate([
    (0, common_1.Controller)("backoffice-user-roles"),
    (0, swagger_1.ApiTags)("Funcoes Backoffice"),
    __metadata("design:paramtypes", [user_roles_service_1.UserRoleService,
        feature_auth_service_1.FeatureAuthService])
], UserRoleBackofficeController);
//# sourceMappingURL=user-roles.controller.js.map