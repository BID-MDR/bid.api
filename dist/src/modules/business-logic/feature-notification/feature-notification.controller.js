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
exports.FeatureNotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_ok_response_dto_decorator_1 = require("../../../core/decorators/swagger/api-ok-response-dto.decorator");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const encrypt_interceptor_1 = require("../../../core/interceptors/encrypt.interceptor");
const create_notification_dto_1 = require("../../data-interaction/database/dtos/notification/create-notification.dto");
const response_notification_dto_1 = require("../../data-interaction/database/dtos/notification/response-notification.dto");
const update_notification_dto_1 = require("../../data-interaction/database/dtos/notification/update-notification.dto");
const feature_notification_service_1 = require("./feature-notification.service");
let FeatureNotificationController = class FeatureNotificationController {
    featureNotificationService;
    constructor(featureNotificationService) {
        this.featureNotificationService = featureNotificationService;
    }
    async listLogged(req) {
        const userId = req.user.userId;
        return await this.featureNotificationService.listByUserId(userId);
    }
    async getById(id) {
        return await this.featureNotificationService.findById(id);
    }
    async create(body) {
        return await this.featureNotificationService.create(body);
    }
    async update(req, body) {
        const userId = req.user.userId;
        return await this.featureNotificationService.update(userId, body);
    }
};
exports.FeatureNotificationController = FeatureNotificationController;
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Lista as visitas técnicas do usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Lista as visitas técnicas do usuário logado que iniciou a requisição.',
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_notification_dto_1.NotificationResponseDto,
        description: 'Pedido de obra.',
    }),
    (0, common_1.SerializeOptions)({
        type: response_notification_dto_1.NotificationResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeatureNotificationController.prototype, "listLogged", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiOperation)({
        description: 'Retorna a visita técnica.',
        summary: 'Retorna a visita técnica pelo ID.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID da visita técnica.',
        required: true,
        allowEmptyValue: false,
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_notification_dto_1.NotificationResponseDto,
        description: 'Visita técnica.',
    }),
    (0, common_1.SerializeOptions)({
        type: response_notification_dto_1.NotificationResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureNotificationController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiOperation)({
        description: 'Cria uma visita técnica.',
        summary: 'Cria uma visita técnica.',
    }),
    (0, swagger_1.ApiBody)({
        type: create_notification_dto_1.CreateNotificationDto,
        required: true,
        description: 'Visita técnica a ser criada.',
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_notification_dto_1.NotificationResponseDto,
        description: 'Visita técnica criada.',
    }),
    (0, common_1.SerializeOptions)({
        type: response_notification_dto_1.NotificationResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_notification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], FeatureNotificationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(''),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(new encrypt_interceptor_1.EncryptInterceptor()),
    (0, swagger_1.ApiOperation)({
        description: 'Enpoint único para Atualizar uma visita técnica.',
        summary: 'Atualiza uma visita técnica.',
    }),
    (0, swagger_1.ApiBody)({
        type: update_notification_dto_1.UpdateNotificationDto,
        required: true,
        description: 'Visita técnica a ser atualizada.',
    }),
    (0, api_ok_response_dto_decorator_1.ApiOkResponseDtoData)({
        type: response_notification_dto_1.NotificationResponseDto,
        description: 'Visita técnica atualizada.',
    }),
    (0, common_1.SerializeOptions)({
        type: response_notification_dto_1.NotificationResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_notification_dto_1.UpdateNotificationDto]),
    __metadata("design:returntype", Promise)
], FeatureNotificationController.prototype, "update", null);
exports.FeatureNotificationController = FeatureNotificationController = __decorate([
    (0, common_1.Controller)('notifications'),
    (0, swagger_1.ApiTags)('Notificação'),
    __metadata("design:paramtypes", [feature_notification_service_1.FeatureNotificationService])
], FeatureNotificationController);
//# sourceMappingURL=feature-notification.controller.js.map