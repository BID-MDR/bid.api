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
var WorkRequestController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkRequestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../../core/decorators/roles.decorator");
const api_ok_response_dto_decorator_1 = require("../../../core/decorators/swagger/api-ok-response-dto.decorator");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const roles_guard_1 = require("../../../core/guards/roles.guard");
const create_work_request_dto_1 = require("../../data-interaction/database/dtos/work-request/create-work-request.dto");
const response_work_request_dto_1 = require("../../data-interaction/database/dtos/work-request/response-work-request.dto");
const update_work_request_dto_1 = require("../../data-interaction/database/dtos/work-request/update-work-request.dto");
const employee_role_enum_1 = require("../../data-interaction/database/enums/employee-role.enum");
const work_request_service_1 = require("./work-request.service");
let WorkRequestController = WorkRequestController_1 = class WorkRequestController {
    service;
    _logger = new common_1.Logger(WorkRequestController_1.name);
    constructor(service) {
        this.service = service;
    }
    async list() {
        return await this.service.list();
    }
    async getById(id) {
        return await this.service.findById(id);
    }
    async create(dto, req) {
        const companyId = req.user.companyId;
        return await this.service.register(dto, companyId);
    }
    async update(id, dto) {
        return await this.service.update(id, dto);
    }
    async carryOut(id, req) {
        const companyId = req.user.companyId;
        return await this.service.carryOut(id, companyId);
    }
};
exports.WorkRequestController = WorkRequestController;
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiOperation)({
        description: "Lista de vistorias.",
        summary: "Listar vistorias.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
        description: "Lista de vistorias.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkRequestController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("id/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: "Vistoria por ID.",
        summary: "Vistoria por ID.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
        description: "Vistoria por ID.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkRequestController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_inspection]),
    (0, swagger_1.ApiOperation)({
        description: "Registrar vistoria.",
        summary: "Registrar vistoria.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
        description: "Vistoria registrada.",
    }),
    (0, swagger_1.ApiBody)({
        type: create_work_request_dto_1.CreateWorkRequestDto,
        required: true,
        description: "Construção a ser criado.",
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_work_request_dto_1.CreateWorkRequestDto, Object]),
    __metadata("design:returntype", Promise)
], WorkRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("id/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_inspection]),
    (0, swagger_1.ApiOperation)({
        description: "Atualizar vistoria.",
        summary: "Atualizar vistoria.",
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
        description: "Vistoria atualizada.",
    }),
    (0, swagger_1.ApiBody)({
        type: update_work_request_dto_1.UpdateWorkRequestDto,
        required: true,
        description: "Construção a ser atualizado.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_work_request_dto_1.UpdateWorkRequestDto]),
    __metadata("design:returntype", Promise)
], WorkRequestController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("carry-out/:id"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_inspection]),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
        description: "Pedido de demanda.",
    }),
    (0, common_1.SerializeOptions)({
        type: response_work_request_dto_1.ResponseWorkRequestDto,
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkRequestController.prototype, "carryOut", null);
exports.WorkRequestController = WorkRequestController = WorkRequestController_1 = __decorate([
    (0, common_1.Controller)("work-request"),
    (0, swagger_1.ApiTags)("Work Request/Vistoria"),
    __metadata("design:paramtypes", [work_request_service_1.WorkRequestService])
], WorkRequestController);
//# sourceMappingURL=work-request.controller.js.map