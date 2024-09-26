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
var DemandController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_ok_response_dto_decorator_1 = require("../../../core/decorators/swagger/api-ok-response-dto.decorator");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const register_demand_dto_1 = require("../../data-interaction/database/dtos/demand/register-demand.dto");
const response_demand_dto_1 = require("../../data-interaction/database/dtos/demand/response-demand.dto");
const demand_service_1 = require("./demand.service");
const demand_status_enum_1 = require("../../data-interaction/database/enums/demand-status.enum");
const update_status_demand_dto_1 = require("../../data-interaction/database/dtos/demand/update-status-demand.dto");
const roles_decorator_1 = require("../../../core/decorators/roles.decorator");
const roles_guard_1 = require("../../../core/guards/roles.guard");
const employee_role_enum_1 = require("../../data-interaction/database/enums/employee-role.enum");
let DemandController = DemandController_1 = class DemandController {
    demandService;
    _logger = new common_1.Logger(DemandController_1.name);
    constructor(demandService) {
        this.demandService = demandService;
    }
    async getLogged(req) {
        const userId = req.user.userId;
        return await this.demandService.listByUser(userId);
    }
    async getById(id) {
        return await this.demandService.findById(id);
    }
    async getByWorkRequesId(id) {
        return await this.demandService.getByWorkRequestId(id);
    }
    async getByProfessionalId(id) {
        return await this.demandService.listByUser(id);
    }
    async getByProfessionalIdImprovement(id) {
        return await this.demandService.listByUserImprovement(id);
    }
    async changeStatus(id, status) {
        return await this.demandService.updateStatus(id, status);
    }
    async listVisit(req) {
        const userId = req.user.userId;
        return await this.demandService.listForVisit(userId);
    }
    async listForConstructions(req) {
        const userId = req.user.userId;
        return await this.demandService.listForConstructions(userId);
    }
    async register(req, dto) {
        const userId = req.user.userId;
        return await this.demandService.register(userId, dto);
    }
    async delete(id) {
        return await this.demandService.delete(id);
    }
    async listByStatus(status) {
        return await this.demandService.listByStatus(status);
    }
    async confirmConclusion(id, req) {
        const userId = req.user.userId;
        return await this.demandService.confirmConclusion(id, userId);
    }
};
exports.DemandController = DemandController;
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_demand_dto_1.ResponseDemandDto,
        isArray: true,
        description: "Pedido de obra.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_demand_dto_1.ResponseDemandDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "getLogged", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: register_demand_dto_1.DemandRegisterRequestDto,
        description: "Pedido de demanda.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_demand_dto_1.ResponseDemandDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("get-by-workRequestId/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, common_1.SerializeOptions)({
        type: response_demand_dto_1.ResponseDemandDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "getByWorkRequesId", null);
__decorate([
    (0, common_1.Get)("get-by-professionalId/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "getByProfessionalId", null);
__decorate([
    (0, common_1.Get)("get-by-professionalId/improvement/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "getByProfessionalIdImprovement", null);
__decorate([
    (0, common_1.Put)("changeStatus/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_demand_dto_1.StatusDemandDto]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Get)("visit"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_demand_dto_1.ResponseDemandDto,
        isArray: true,
        description: "Pedido de demanda.",
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "listVisit", null);
__decorate([
    (0, common_1.Get)('constructions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_demand_dto_1.ResponseDemandDto,
        isArray: true,
        description: "Pedido de demanda.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_demand_dto_1.ResponseDemandDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "listForConstructions", null);
__decorate([
    (0, common_1.Post)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_demand]),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_demand_dto_1.ResponseDemandDto,
        description: "Pedido de demanda.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_demand_dto_1.ResponseDemandDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_demand_dto_1.DemandRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "register", null);
__decorate([
    (0, common_1.Delete)("delete-by-id/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_demand]),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('status/:status'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_demand_dto_1.ResponseDemandDto,
        isArray: true,
        description: "Pedido de demanda.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_demand_dto_1.ResponseDemandDto,
    }),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "listByStatus", null);
__decorate([
    (0, common_1.Put)('confirm-conclusion/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_demand_dto_1.ResponseDemandDto,
        isArray: true,
        description: "Pedido de demanda.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_demand_dto_1.ResponseDemandDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DemandController.prototype, "confirmConclusion", null);
exports.DemandController = DemandController = DemandController_1 = __decorate([
    (0, common_1.Controller)("demand"),
    (0, swagger_1.ApiTags)("Demand/Pedido de demanda"),
    __metadata("design:paramtypes", [demand_service_1.DemandService])
], DemandController);
//# sourceMappingURL=demand.controller.js.map