import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { MessageService } from 'src/modules/business-logic/message/message.service';
import { MessageListWebsocketDto } from '../../database/dtos/message/message-list-websockt.dto';
import { MessageRegisterRequestDto } from '../../database/dtos/message/register-message.dto';
import { MessageListIdentifierWebsocketDto } from '../../database/dtos/message/message-list-identifier-websocket.dto';
import { MessageBackofficeRegisterRequestDto } from 'src/modules/backoffice/help/dto/message-register.dto';
import { MessageBackofficeService } from 'src/modules/backoffice/message/message.service';
export declare class ChatGateway implements OnGatewayConnection {
    private readonly chatService;
    private readonly messageService;
    private readonly messageServiceBackoffice;
    server: Server;
    constructor(chatService: ChatService, messageService: MessageService, messageServiceBackoffice: MessageBackofficeService);
    listenForMessages(message: string, socket: Socket): string;
    handleConnection(client: Socket): void;
    onNewMessage(client: Socket, body: MessageRegisterRequestDto): Promise<void>;
    requestListMessages(client: Socket, dto: MessageListWebsocketDto): Promise<void>;
    requestListMessagesByIdentifier(client: Socket, dto: MessageListIdentifierWebsocketDto): Promise<void>;
    joinRoom(client: Socket, dto: MessageListIdentifierWebsocketDto): Promise<void>;
    onNewMessageBackoffice(client: Socket, body: MessageBackofficeRegisterRequestDto): Promise<void>;
    requestListMessagesBackoffice(client: Socket, dto: MessageListWebsocketDto): Promise<void>;
    requestListMessagesByIdentifierBackoffice(client: Socket, dto: MessageListIdentifierWebsocketDto): Promise<void>;
    joinRoomBackoffice(client: Socket, dto: MessageListIdentifierWebsocketDto): Promise<void>;
}
