import { UseGuards } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketGuard } from '../guards/socket.guard';
import { ChatService } from '../services/chat.service';
import { ChatGatewayEventsEnum } from '../../database/enums/chat-gateway.enum';
import { ResponseDto } from 'src/core/dtos/response.dto';
import { MessageService } from 'src/modules/business-logic/message/message.service';
import { MessageListWebsocketDto } from '../../database/dtos/message/message-list-websockt.dto';
import { MessageWebsocketRegisterRequestDto } from '../../database/dtos/message/message-register-websocket';
import { MessageRegisterRequestDto } from '../../database/dtos/message/register-message.dto';
import { MessageListIdentifierWebsocketDto } from '../../database/dtos/message/message-list-identifier-websocket.dto';

@WebSocketGateway({
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: false,
      allowedHeaders: 'Content-Type, Accept, Authorization',
    },
    path: '/socket/chat',
})
 @UseGuards(SocketGuard)
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly chatService: ChatService,
        private readonly messageService: MessageService
    ) {}

    @SubscribeMessage('send_message')
    listenForMessages(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {
        this.server.sockets.emit('receive_message', message);
        return message;
    }

    handleConnection(client: Socket) {
        this.chatService.authenticateUser(client);
    }
    
    @SubscribeMessage(ChatGatewayEventsEnum.SEND_MESSAGE)
    async onNewMessage(
      @ConnectedSocket() client: Socket,
      @MessageBody() body: MessageRegisterRequestDto,
    ) {
      if (body.content) {
        await this.messageService.register(body.client1, body.client2, body);
      }
  
      const result = await this.messageService.listConversation(body.client1, body.client2);
  
      this.server.emit(
        ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER,
        new ResponseDto(true, result, null),
      );
    }
  
    @SubscribeMessage(ChatGatewayEventsEnum.REQUEST_MESSAGE)
    async requestListMessages(
      @ConnectedSocket() client: Socket,
      @MessageBody() dto: MessageListWebsocketDto,
    ) {
      console.log('aaaaaaaaaa')
      const result = await this.messageService.listConversation(dto.client1, dto.client2);
  
      this.server.emit(
        ChatGatewayEventsEnum.RESPONSE_MESSAGE,
        new ResponseDto(true, result, []),
      );
    }

    

      
    @SubscribeMessage(ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER)
    async requestListMessagesByIdentifier(
      @ConnectedSocket() client: Socket,
      @MessageBody() dto: MessageListIdentifierWebsocketDto,
    ) {
      console.log('1234', dto.identifier)
      const result = await this.messageService.listConversationByIdentifier(dto.identifier);
      this.server.to(dto.identifier)
      .emit(
        ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER,
        new ResponseDto(true, result, []),
      );
    }
}
