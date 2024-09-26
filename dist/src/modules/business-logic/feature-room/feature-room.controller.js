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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureRoomController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_ok_response_dto_decorator_1 = require("../../../core/decorators/swagger/api-ok-response-dto.decorator");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const encrypt_interceptor_1 = require("../../../core/interceptors/encrypt.interceptor");
const create_room_dto_1 = require("../../data-interaction/database/dtos/room/create-room.dto");
const reponse_room_dto_1 = require("../../data-interaction/database/dtos/room/reponse-room.dto");
const feature_room_service_1 = require("./feature-room.service");
const create_room_solution_dto_1 = require("../../data-interaction/database/dtos/room-solution/create-room-solution.dto");
const request_dto_1 = require("../../data-interaction/database/dtos/room-solution/request.dto");
const roles_decorator_1 = require("../../../core/decorators/roles.decorator");
const roles_guard_1 = require("../../../core/guards/roles.guard");
const employee_role_enum_1 = require("../../data-interaction/database/enums/employee-role.enum");
let FeatureRoomController = class FeatureRoomController {
    featureRoomService;
    constructor(featureRoomService) {
        this.featureRoomService = featureRoomService;
    }
    async list() {
        return await this.featureRoomService.selectAll();
    }
    async listByWorkRequest(id) {
        return await this.featureRoomService.selectAllWithIntervention(id);
    }
    async listByWorkRequestId(id) {
        return await this.featureRoomService.selectAllByWorkRequest(id);
    }
    async getById(id) {
        return await this.featureRoomService.findById(id);
    }
    async getRoom(id) {
        return await this.featureRoomService.getRoomByRoomSolutionId(id);
    }
    async create(body) {
        return await this.featureRoomService.create(body);
    }
    async createRoomSolution(body) {
        return await this.featureRoomService.createRoomSolution(body);
    }
    async waitIntervention(body) {
        return await this.featureRoomService.register(body);
    }
    async selectSolutions(id) {
        return await this.featureRoomService.selectInterventions(id);
    }
};
exports.FeatureRoomController = FeatureRoomController;
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "listByWorkRequest", null);
__decorate([
    (0, common_1.Get)('listbyworkrequest/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "listByWorkRequestId", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Retorna o Quarto.',
        summary: 'Retorna o Quarto por ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID do Quarto.',
        required: true,
        allowEmptyValue: false,
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: reponse_room_dto_1.RoomResponseDto,
        description: 'Quarto.',
    }),
    (0, common_1.SerializeOptions)({
        type: reponse_room_dto_1.RoomResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('get-room/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Retorna o Quarto.',
        summary: 'Retorna o Quarto por ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID do Quarto.',
        required: true,
        allowEmptyValue: false,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_quality, employee_role_enum_1.EmployeeRoleEnum.manager_inspection]),
    (0, swagger_1.ApiOperation)({
        description: 'Cria um Quarto.',
        summary: 'Cria um Quarto.',
    }),
    (0, swagger_1.ApiBody)({
        type: create_room_dto_1.CreateRoomDto,
        required: true,
        description: 'Quarto a ser criado.',
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: reponse_room_dto_1.RoomResponseDto,
        description: 'Quarto a ser criado.',
    }),
    (0, common_1.SerializeOptions)({
        type: reponse_room_dto_1.RoomResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('room-solution'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_quality]),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiOperation)({
        description: 'Cria um Quarto.',
        summary: 'Cria um Quarto.',
    }),
    (0, swagger_1.ApiBody)({
        type: create_room_solution_dto_1.CreateRoomSolutionDto,
        required: true,
        description: 'Quarto a ser criado.',
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: reponse_room_dto_1.RoomResponseDto,
        description: 'Quarto a ser criado.',
    }),
    (0, common_1.SerializeOptions)({
        type: reponse_room_dto_1.RoomResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_solution_dto_1.CreateRoomSolutionDto]),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "createRoomSolution", null);
__decorate([
    (0, common_1.Post)('room-solution/wait-intervention'),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_quality]),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestRoomSolutionDto]),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "waitIntervention", null);
__decorate([
    (0, common_1.Get)('room-solution/:id'),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureRoomController.prototype, "selectSolutions", null);
exports.FeatureRoomController = FeatureRoomController = __decorate([
    (0, common_1.Controller)('room'),
    (0, swagger_1.ApiTags)('Quarto'),
    __metadata("design:paramtypes", [feature_room_service_1.FeatureRoomService])
], FeatureRoomController);
//# sourceMappingURL=feature-room.controller.js.map