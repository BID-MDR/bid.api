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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const message_repository_1 = require("../../data-interaction/database/repositories/user/message.repository");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
let MessageService = class MessageService extends base_service_1.BaseService {
    messageRepository;
    userRepository;
    server;
    constructor(messageRepository, userRepository) {
        super(messageRepository);
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    async listConversation(user1, user2) {
        const userEntity1 = await this.userRepository.getById(user1);
        const userEntity2 = await this.userRepository.getById(user2);
        return await this.messageRepository.listByConversation(userEntity1, userEntity2);
    }
    async listConversationByIdentifier(identifier) {
        const msgList = await this.messageRepository.listConversationByIdentifier(identifier);
        return msgList;
    }
    async listAllMsgByUser(userId) {
        const user = await this.userRepository.getById(userId);
        const msgList = await this.messageRepository.listAllMsgByUser(user);
        const userMessagesMap = {};
        msgList.forEach(msg => {
            [msg.sender, msg.receiver].forEach(participant => {
                if (participant.id !== user.id) {
                    if (!userMessagesMap[participant.id] || userMessagesMap[participant.id].lastMessageTime < msg.sentAt) {
                        userMessagesMap[participant.id] = {
                            user: participant,
                            lastMessage: msg.content,
                            lastMessageTime: msg.sentAt,
                        };
                    }
                }
            });
        });
        const usersInvolved = Object.values(userMessagesMap);
        return usersInvolved;
    }
    async register(user1, user2, data) {
        data.sender = await this.userRepository.getById(user1);
        data.receiver = await this.userRepository.getById(user2);
        data.identifier = data.sender.id.toString() + data.receiver.id.toString();
        const newMsg = await super.create(data);
        return newMsg;
    }
    async delete(messageId, userId) {
        const message = await this.messageRepository.findById(messageId);
        const sender = await this.userRepository.findById(userId);
        if (message.sender !== sender)
            throw new Error('You did not send this menssage.');
        return await this.messageRepository.hardDelete(messageId);
    }
};
exports.MessageService = MessageService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageService.prototype, "server", void 0);
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository,
        user_repository_1.UserRepository])
], MessageService);
//# sourceMappingURL=message.service.js.map