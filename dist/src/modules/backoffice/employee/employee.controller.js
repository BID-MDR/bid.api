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
var EmployeeBackofficeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeBackofficeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const employee_service_1 = require("./employee.service");
const roles_backoffice_guard_1 = require("../../../core/guards/roles-backoffice.guard");
const roles_backoffice_decorator_1 = require("../../../core/decorators/roles-backoffice.decorator");
const functionTypeEnum_1 = require("../user/dto/functionTypeEnum");
let EmployeeBackofficeController = EmployeeBackofficeController_1 = class EmployeeBackofficeController {
    service;
    _logger = new common_1.Logger(EmployeeBackofficeController_1.name);
    constructor(service) {
        this.service = service;
    }
    async list() {
        return await this.service.list();
    }
    async getById(id) {
        return await this.service.getById(id);
    }
};
exports.EmployeeBackofficeController = EmployeeBackofficeController;
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.GERIR_AGENTE_PROMOTOR]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeBackofficeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("by-id/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.GERIR_AGENTE_PROMOTOR]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeBackofficeController.prototype, "getById", null);
exports.EmployeeBackofficeController = EmployeeBackofficeController = EmployeeBackofficeController_1 = __decorate([
    (0, common_1.Controller)("employee-backoffice"),
    (0, swagger_1.ApiTags)("Employee Backoffice"),
    __metadata("design:paramtypes", [employee_service_1.EmployeeBackofficeService])
], EmployeeBackofficeController);
//# sourceMappingURL=employee.controller.js.map