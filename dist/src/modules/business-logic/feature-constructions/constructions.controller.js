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
var ConstructionsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const create_constructions_dto_1 = require("../../data-interaction/database/dtos/constructions/create-constructions.dto");
const constructions_service_1 = require("./constructions.service");
const roles_decorator_1 = require("../../../core/decorators/roles.decorator");
const roles_guard_1 = require("../../../core/guards/roles.guard");
const employee_role_enum_1 = require("../../data-interaction/database/enums/employee-role.enum");
let ConstructionsController = ConstructionsController_1 = class ConstructionsController {
    constructionsService;
    _logger = new common_1.Logger(ConstructionsController_1.name);
    constructor(constructionsService) {
        this.constructionsService = constructionsService;
    }
    async get() {
        return await this.constructionsService.list();
    }
    async getMonth(month) {
        return await this.constructionsService.listByMonth(month);
    }
    async firstStepPhotos(demandId, dto, files, req) {
        const user = req.user;
        return await this.constructionsService.firstStepPhotos(dto.roomSolutionId, files, demandId, user.companyId);
    }
    async secondStepConstructions(demandId, dto, req) {
        const user = req.user;
        return await this.constructionsService.secondStepConstructions(dto, demandId, user.companyId);
    }
    async update(demandId, dto, req) {
        const user = req.user;
        return await this.constructionsService.update(dto, demandId, user.companyId);
    }
    async deletePhoto(demandId, photoId) {
        return await this.constructionsService.deletePhoto(demandId, photoId);
    }
    async finishConstructions(demandId, req) {
        const user = req.user;
        return await this.constructionsService.conclude(demandId, user.companyId);
    }
};
exports.ConstructionsController = ConstructionsController;
__decorate([
    (0, common_1.Get)(""),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConstructionsController.prototype, "get", null);
__decorate([
    (0, common_1.Get)("get-month/:month"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ConstructionsController.prototype, "getMonth", null);
__decorate([
    (0, common_1.Post)("first-step-photos/:demandId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_construction]),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("files")),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                files: {
                    type: "array",
                    items: {
                        type: "string",
                        format: "binary",
                    },
                },
                roomSolutionId: { type: "string" },
            },
        },
    }),
    __param(0, (0, common_1.Param)("demandId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Array, Object]),
    __metadata("design:returntype", Promise)
], ConstructionsController.prototype, "firstStepPhotos", null);
__decorate([
    (0, common_1.Post)("second-step-constructions/:demandId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_construction]),
    __param(0, (0, common_1.Param)("demandId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_constructions_dto_1.CreateConstructionsDto, Object]),
    __metadata("design:returntype", Promise)
], ConstructionsController.prototype, "secondStepConstructions", null);
__decorate([
    (0, common_1.Put)("update-constructions/:demandId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_construction]),
    __param(0, (0, common_1.Param)("demandId")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_constructions_dto_1.CreateConstructionsDto, Object]),
    __metadata("design:returntype", Promise)
], ConstructionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("photo/:demandId/:photoId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_construction]),
    __param(0, (0, common_1.Param)("demandId")),
    __param(1, (0, common_1.Param)("photoId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ConstructionsController.prototype, "deletePhoto", null);
__decorate([
    (0, common_1.Put)("finish-constructions/:demandId"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)([employee_role_enum_1.EmployeeRoleEnum.manager_admin, employee_role_enum_1.EmployeeRoleEnum.manager_construction]),
    __param(0, (0, common_1.Param)("demandId")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ConstructionsController.prototype, "finishConstructions", null);
exports.ConstructionsController = ConstructionsController = ConstructionsController_1 = __decorate([
    (0, common_1.Controller)("construction"),
    (0, swagger_1.ApiTags)("Constructions/obra"),
    __metadata("design:paramtypes", [constructions_service_1.ConstructionsService])
], ConstructionsController);
//# sourceMappingURL=constructions.controller.js.map