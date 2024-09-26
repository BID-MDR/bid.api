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
var SatisfactionResearchBackofficeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactionResearchBackofficeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const satisfaction_research_service_1 = require("./satisfaction-research.service");
const roles_backoffice_guard_1 = require("../../../core/guards/roles-backoffice.guard");
const roles_backoffice_decorator_1 = require("../../../core/decorators/roles-backoffice.decorator");
const functionTypeEnum_1 = require("../user/dto/functionTypeEnum");
let SatisfactionResearchBackofficeController = SatisfactionResearchBackofficeController_1 = class SatisfactionResearchBackofficeController {
    service;
    _logger = new common_1.Logger(SatisfactionResearchBackofficeController_1.name);
    constructor(service) {
        this.service = service;
    }
    async register(dto, req, workRequestId) {
        const userId = req.user.userId;
        return await this.service.register(dto, userId, workRequestId);
    }
    async list() {
        return await this.service.list();
    }
    async listBeneficiary() {
        return await this.service.listBeneficiary();
    }
    async listBeneficiaryMonth(month) {
        return await this.service.listBeneficiaryMonth(month);
    }
    async listProfessional() {
        return await this.service.listProfessional();
    }
    async listProfessionalMonth(month) {
        return await this.service.listProfessionalMonth(month);
    }
    async delete(id) {
        return await this.service.hardDelete(id);
    }
};
exports.SatisfactionResearchBackofficeController = SatisfactionResearchBackofficeController;
__decorate([
    (0, common_1.Post)("register/:workRequestId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.PESQUISAS]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('workRequestId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], SatisfactionResearchBackofficeController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.PESQUISAS]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SatisfactionResearchBackofficeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('beneficiary'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.PESQUISAS]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SatisfactionResearchBackofficeController.prototype, "listBeneficiary", null);
__decorate([
    (0, common_1.Get)('beneficiary/:month'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.PESQUISAS]),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SatisfactionResearchBackofficeController.prototype, "listBeneficiaryMonth", null);
__decorate([
    (0, common_1.Get)('professional'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.PESQUISAS]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SatisfactionResearchBackofficeController.prototype, "listProfessional", null);
__decorate([
    (0, common_1.Get)('professional/:month'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.PESQUISAS]),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SatisfactionResearchBackofficeController.prototype, "listProfessionalMonth", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.PESQUISAS]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SatisfactionResearchBackofficeController.prototype, "delete", null);
exports.SatisfactionResearchBackofficeController = SatisfactionResearchBackofficeController = SatisfactionResearchBackofficeController_1 = __decorate([
    (0, common_1.Controller)("satisfaction-research-backoffice"),
    (0, swagger_1.ApiTags)("satisfaction-research Backoffice"),
    __metadata("design:paramtypes", [satisfaction_research_service_1.SatisfactionResearchBackofficeService])
], SatisfactionResearchBackofficeController);
//# sourceMappingURL=satisfaction-research.controller.js.map