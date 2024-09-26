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
var EmployeeRoleController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const employee_role_service_1 = require("./employee-role.service");
const employee_role_create_dto_1 = require("../../data-interaction/database/dtos/employee-role/employee-role-create.dto");
let EmployeeRoleController = EmployeeRoleController_1 = class EmployeeRoleController {
    service;
    _logger = new common_1.Logger(EmployeeRoleController_1.name);
    constructor(service) {
        this.service = service;
    }
    async register(dto) {
        return await this.service.register(dto);
    }
    async list() {
        return await this.service.list();
    }
    async activeEmployee(id, req) {
        const userId = req.user.userId;
        return await this.service.activeRole(id, userId);
    }
    async delete(id) {
        return await this.service.hardDelete(id);
    }
};
exports.EmployeeRoleController = EmployeeRoleController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_role_create_dto_1.CreateEmployeeRoleDto]),
    __metadata("design:returntype", Promise)
], EmployeeRoleController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeRoleController.prototype, "list", null);
__decorate([
    (0, common_1.Put)("active-role/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeRoleController.prototype, "activeEmployee", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeRoleController.prototype, "delete", null);
exports.EmployeeRoleController = EmployeeRoleController = EmployeeRoleController_1 = __decorate([
    (0, common_1.Controller)("role-employee"),
    (0, swagger_1.ApiTags)("role-employee/FuncaoFuncionario"),
    __metadata("design:paramtypes", [employee_role_service_1.EmployeeRoleService])
], EmployeeRoleController);
//# sourceMappingURL=employee-role.controller.js.map