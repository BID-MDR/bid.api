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
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socket_guard_1 = require("../guards/socket.guard");
const chat_service_1 = require("../services/chat.service");
const chat_gateway_enum_1 = require("../../database/enums/chat-gateway.enum");
const response_dto_1 = require("../../../../core/dtos/response.dto");
const message_service_1 = require("../../../business-logic/message/message.service");
const message_list_websockt_dto_1 = require("../../database/dtos/message/message-list-websockt.dto");
const register_message_dto_1 = require("../../database/dtos/message/register-message.dto");
const message_list_identifier_websocket_dto_1 = require("../../database/dtos/message/message-list-identifier-websocket.dto");
const message_register_dto_1 = require("../../../backoffice/help/dto/message-register.dto");
const message_service_2 = require("../../../backoffice/message/message.service");
let ChatGateway = class ChatGateway {
    chatService;
    messageService;
    messageServiceBackoffice;
    server;
    constructor(chatService, messageService, messageServiceBackoffice) {
        this.chatService = chatService;
        this.messageService = messageService;
        this.messageServiceBackoffice = messageServiceBackoffice;
    }
    listenForMessages(message, socket) {
        this.server.sockets.emit('receive_message', message);
        return message;
    }
    handleConnection(client) {
        this.chatService.authenticateUser(client);
    }
    async onNewMessage(client, body) {
        console.log(body);
        if (body.content) {
            await this.messageService.register(body.client1, body.client2, body);
        }
        const result = await this.messageService.listConversation(body.client1, body.client2);
        const roomIdentifier = body.client1.toString() + body.client2.toString();
        client.join(roomIdentifier);
        this.server.emit(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER, new response_dto_1.ResponseDto(true, result, []));
    }
    async requestListMessages(client, dto) {
        const result = await this.messageService.listConversation(dto.client1, dto.client2);
        this.server.emit(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE, new response_dto_1.ResponseDto(true, result, []));
    }
    async requestListMessagesByIdentifier(client, dto) {
        const result = await this.messageService.listConversation(dto.client1, dto.client2);
        client.join(dto.identifier);
        this.server
            .to(dto.identifier)
            .emit(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER, new response_dto_1.ResponseDto(true, result, []));
    }
    async joinRoom(client, dto) {
        const convseration = await this.messageService.listConversationByIdentifier(dto.identifier);
        client.join(dto.identifier);
        this.server
            .to(dto.identifier)
            .emit(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER, new response_dto_1.ResponseDto(true, convseration, null));
    }
    async onNewMessageBackoffice(client, body) {
        if (body.content) {
            await this.messageServiceBackoffice.register(body.client1, body.client2, body);
        }
        const result = await this.messageServiceBackoffice.listConversation(body.client1, body.client2);
        const roomIdentifier = body.client1.toString() + body.client2.toString();
        client.join(roomIdentifier);
        this.server.emit(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE, new response_dto_1.ResponseDto(true, result, []));
    }
    async requestListMessagesBackoffice(client, dto) {
        const result = await this.messageServiceBackoffice.listConversation(dto.client1, dto.client2);
        this.server.emit(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_BACKOFFICE, new response_dto_1.ResponseDto(true, result, []));
    }
    async requestListMessagesByIdentifierBackoffice(client, dto) {
        const result = await this.messageServiceBackoffice.listConversation(dto.client1, dto.client2);
        client.join(dto.identifier);
        this.server
            .to(dto.identifier)
            .emit(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE, new response_dto_1.ResponseDto(true, result, []));
    }
    async joinRoomBackoffice(client, dto) {
        const convseration = await this.messageServiceBackoffice.listConversationByIdentifier(dto.identifier);
        client.join(dto.identifier);
        this.server
            .to(dto.identifier)
            .emit(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE, new response_dto_1.ResponseDto(true, convseration, null));
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('send_message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "listenForMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_gateway_enum_1.ChatGatewayEventsEnum.SEND_MESSAGE),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        register_message_dto_1.MessageRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onNewMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_gateway_enum_1.ChatGatewayEventsEnum.REQUEST_MESSAGE),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        message_list_websockt_dto_1.MessageListWebsocketDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "requestListMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        message_list_identifier_websocket_dto_1.MessageListIdentifierWebsocketDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "requestListMessagesByIdentifier", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_gateway_enum_1.ChatGatewayEventsEnum.REQUEST_JOIN_ROOM_IDENTIFIER),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        message_list_identifier_websocket_dto_1.MessageListIdentifierWebsocketDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_gateway_enum_1.ChatGatewayEventsEnum.SEND_MESSAGE_BACKOFFICE),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        message_register_dto_1.MessageBackofficeRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onNewMessageBackoffice", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_gateway_enum_1.ChatGatewayEventsEnum.REQUEST_MESSAGE_BACKOFFICE),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        message_list_websockt_dto_1.MessageListWebsocketDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "requestListMessagesBackoffice", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_gateway_enum_1.ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        message_list_identifier_websocket_dto_1.MessageListIdentifierWebsocketDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "requestListMessagesByIdentifierBackoffice", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(chat_gateway_enum_1.ChatGatewayEventsEnum.REQUEST_JOIN_ROOM_IDENTIFIER_BACKOFFICE),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        message_list_identifier_websocket_dto_1.MessageListIdentifierWebsocketDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "joinRoomBackoffice", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: false,
            allowedHeaders: 'Content-Type, Accept, Authorization',
        },
        path: '/socket/chat',
    }),
    (0, common_1.UseGuards)(socket_guard_1.SocketGuard),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        message_service_1.MessageService,
        message_service_2.MessageBackofficeService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map