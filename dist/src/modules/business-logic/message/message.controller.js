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
var MessageController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_access_token_guard_1 = require("../../../core/guards/jwt-access-token.guard");
const response_dto_1 = require("../../../core/dtos/response.dto");
const message_service_1 = require("./message.service");
const register_message_dto_1 = require("../../data-interaction/database/dtos/message/register-message.dto");
let MessageController = MessageController_1 = class MessageController {
    messageService;
    _logger = new common_1.Logger(MessageController_1.name);
    constructor(messageService) {
        this.messageService = messageService;
    }
    async getLogged(req, id) {
        const userId = req.user.userId;
        const messageList = await this.messageService.listConversation(userId, id);
        return new response_dto_1.ResponseDto(true, messageList, false);
    }
    async register(req, id, dto) {
        const userId = req.user.userId;
        return await this.messageService.register(userId, id, dto);
    }
    async listConversation(req, id) {
        const msglist = await this.messageService.listAllMsgByUser(id);
        return new response_dto_1.ResponseDto(true, msglist, false);
    }
    async delete(id, req) {
        const userId = req.user.userId;
        return await this.messageService.delete(id, userId);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Get)('reciver/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getLogged", null);
__decorate([
    (0, common_1.Post)('reciver/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, register_message_dto_1.MessageRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('all-user-conversation/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "listConversation", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_access_token_guard_1.JwtAccessTokenGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "delete", null);
exports.MessageController = MessageController = MessageController_1 = __decorate([
    (0, common_1.Controller)('message'),
    (0, swagger_1.ApiTags)('Message/mensagens'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map