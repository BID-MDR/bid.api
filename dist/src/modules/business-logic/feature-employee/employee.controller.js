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
var EmployeeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const employee_register_request_dto_1 = require("../../data-interaction/database/dtos/employee/employee-register-request.dto");
const employee_service_1 = require("./employee.service");
let EmployeeController = EmployeeController_1 = class EmployeeController {
    service;
    _logger = new common_1.Logger(EmployeeController_1.name);
    constructor(service) {
        this.service = service;
    }
    async register(dto, req) {
        const userId = req.user.userId;
        return await this.service.register(dto, userId);
    }
    async activeEmployee(id, req) {
        const userId = req.user.userId;
        return await this.service.activeEmployee(id, userId);
    }
    async list() {
        return await this.service.list();
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_register_request_dto_1.EmployeeRegisterRequestDto, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "register", null);
__decorate([
    (0, common_1.Put)("active/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "activeEmployee", null);
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "list", null);
exports.EmployeeController = EmployeeController = EmployeeController_1 = __decorate([
    (0, common_1.Controller)("employee"),
    (0, swagger_1.ApiTags)("employee/Funcionario"),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map