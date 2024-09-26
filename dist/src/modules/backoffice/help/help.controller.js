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
var HelpBackofficeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpBackofficeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const response_dto_1 = require("../../../core/dtos/response.dto");
const register_help_dto_1 = require("../../data-interaction/database/dtos/help/register-help.dto");
const help_service_1 = require("./help.service");
const roles_backoffice_guard_1 = require("../../../core/guards/roles-backoffice.guard");
const roles_backoffice_decorator_1 = require("../../../core/decorators/roles-backoffice.decorator");
const functionTypeEnum_1 = require("../user/dto/functionTypeEnum");
let HelpBackofficeController = HelpBackofficeController_1 = class HelpBackofficeController {
    helpService;
    _logger = new common_1.Logger(HelpBackofficeController_1.name);
    constructor(helpService) {
        this.helpService = helpService;
    }
    async register(req, dto) {
        const userId = req.user.userId;
        const help = await this.helpService.register(userId, dto);
        return new response_dto_1.ResponseDto(true, help, false);
    }
    async GetById(id) {
        const help = await this.helpService.getById(id);
        return new response_dto_1.ResponseDto(true, help, false);
    }
    async list() {
        const help = await this.helpService.list();
        return new response_dto_1.ResponseDto(true, help, false);
    }
    async listWithMonth(month) {
        const help = await this.helpService.getByMonth(month);
        return new response_dto_1.ResponseDto(true, help, false);
    }
    async listByUser(id) {
        const help = await this.helpService.listByUser(id);
        return new response_dto_1.ResponseDto(true, help, false);
    }
    async delete(id) {
        return await this.helpService.delete(id);
    }
};
exports.HelpBackofficeController = HelpBackofficeController;
__decorate([
    (0, common_1.Post)(''),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.SOLICITACAO_AJUDA]),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_help_dto_1.HelpRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], HelpBackofficeController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('get-by-id/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.SOLICITACAO_AJUDA]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HelpBackofficeController.prototype, "GetById", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.SOLICITACAO_AJUDA]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HelpBackofficeController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('get-month/:month'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HelpBackofficeController.prototype, "listWithMonth", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.SOLICITACAO_AJUDA]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HelpBackofficeController.prototype, "listByUser", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard, roles_backoffice_guard_1.RolesBackofficeGuard),
    (0, roles_backoffice_decorator_1.Roles)([functionTypeEnum_1.FunctionTypeEnum.SOLICITACAO_AJUDA]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HelpBackofficeController.prototype, "delete", null);
exports.HelpBackofficeController = HelpBackofficeController = HelpBackofficeController_1 = __decorate([
    (0, common_1.Controller)('help-backoffice'),
    (0, swagger_1.ApiTags)('Help/help'),
    __metadata("design:paramtypes", [help_service_1.HelpBackofficeService])
], HelpBackofficeController);
//# sourceMappingURL=help.controller.js.map