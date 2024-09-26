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
var CompanyBackofficeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyBackofficeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const company_service_1 = require("./company.service");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const create_company_dto_1 = require("../../data-interaction/database/dtos/company/create-company.dto");
const roles_backoffice_guard_1 = require("../../../core/guards/roles-backoffice.guard");
const functionTypeEnum_1 = require("../user/dto/functionTypeEnum");
const roles_backoffice_decorator_1 = require("../../../core/decorators/roles-backoffice.decorator");
let CompanyBackofficeController = CompanyBackofficeController_1 = class CompanyBackofficeController {
    service;
    _logger = new common_1.Logger(CompanyBackofficeController_1.name);
    constructor(service) {
        this.service = service;
    }
    async register(dto) {
        return await this.service.register(dto);
    }
    async list() {
        return await this.service.list();
    }
    async listByMonth(month) {
        return await this.service.listByMonth(month);
    }
    async getById(id) {
        return await this.service.getById(id);
    }
    async getByOwner(id) {
        return await this.service.getByOwner(id);
    }
    async getByEmployee(id) {
        return await this.service.getByEmployee(id);
    }
    async delete(id) {
        return await this.service.delete(id);
    }
};
exports.CompanyBackofficeController = CompanyBackofficeController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.GERIR_EMPRESAS]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyBackofficeController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.GERIR_EMPRESAS]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyBackofficeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("get-month/:month"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyBackofficeController.prototype, "listByMonth", null);
__decorate([
    (0, common_1.Get)("by-id/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.GERIR_EMPRESAS]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyBackofficeController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("by-owner/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.GERIR_EMPRESAS]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyBackofficeController.prototype, "getByOwner", null);
__decorate([
    (0, common_1.Get)("by-employee/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.GERIR_EMPRESAS]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyBackofficeController.prototype, "getByEmployee", null);
__decorate([
    (0, common_1.Delete)("by-id/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.GERIR_EMPRESAS]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyBackofficeController.prototype, "delete", null);
exports.CompanyBackofficeController = CompanyBackofficeController = CompanyBackofficeController_1 = __decorate([
    (0, common_1.Controller)("company-backoffice"),
    (0, swagger_1.ApiTags)("Company Backoffice"),
    __metadata("design:paramtypes", [company_service_1.CompanyBackofficeService])
], CompanyBackofficeController);
//# sourceMappingURL=company.controller.js.map