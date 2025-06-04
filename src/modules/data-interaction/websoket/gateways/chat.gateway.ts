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
import { MessageBackofficeRegisterRequestDto } from 'src/modules/backoffice/help/dto/message-register.dto';
import { MessageBackofficeService } from 'src/modules/backoffice/message/message.service';

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
    private readonly messageService: MessageService,
    private readonly messageServiceBackoffice: MessageBackofficeService

  ) { }

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
    const roomIdentifier = body.client1.toString() + body.client2.toString();

    client.join(roomIdentifier);
    this.server.emit(
      ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER,
      new ResponseDto(true, result, [])
    );
  }

  @SubscribeMessage(ChatGatewayEventsEnum.REQUEST_MESSAGE)
  async requestListMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: MessageListWebsocketDto,
  ) {
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
    const result = await this.messageService.listConversation(dto.client1, dto.client2);
    client.join(dto.identifier);
    this.server
      .to(dto.identifier)
      .emit(
        ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER,
        new ResponseDto(true, result, []),
      );
  }

  @SubscribeMessage(ChatGatewayEventsEnum.REQUEST_JOIN_ROOM_IDENTIFIER)
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: MessageListIdentifierWebsocketDto,
  ) {
    const convseration = await this.messageService.listConversationByIdentifier(dto.identifier);
    client.join(dto.identifier);
    this.server
      .to(dto.identifier)
      .emit(
        ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER,
        new ResponseDto(true, convseration, null),
      );
  }

  //BACKOFFICE

  @SubscribeMessage(ChatGatewayEventsEnum.SEND_MESSAGE_BACKOFFICE)
  async onNewMessageBackoffice(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: MessageBackofficeRegisterRequestDto,
  ) {
    if (body.content) {
      await this.messageServiceBackoffice.register(body.client1, body.client2, body);
    }

    const result = await this.messageServiceBackoffice.listConversationByIdentifier(body.identifier);
    const roomIdentifier = body.client1.toString() + body.client2.toString();
    client.join(roomIdentifier);
    this.server.to(roomIdentifier).emit(
      ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE,
      new ResponseDto(true, result, []),
    );
  }

  @SubscribeMessage(ChatGatewayEventsEnum.SEND_MESSAGE_BACKOFFICE_TO_APP)
  async onNewMessageBackofficeToApp(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: MessageBackofficeRegisterRequestDto,
  ) {

    if (body.content) {
      await this.messageServiceBackoffice.registerBackofficeToApp(body.client1, body.client2, body);
    }

    const result = await this.messageServiceBackoffice.listConversationByIdentifier(body.identifier);
    const roomIdentifier = body.client1.toString() + body.client2.toString();

    client.join(roomIdentifier);
    this.server.emit(
      ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE,
      new ResponseDto(true, result, [])
    );
  }

  @SubscribeMessage(ChatGatewayEventsEnum.REQUEST_MESSAGE_BACKOFFICE)
  async requestListMessagesBackoffice(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: MessageListWebsocketDto,
  ) {
    const result = await this.messageServiceBackoffice.listConversation(dto.client1, dto.client2);

    this.server.emit(
      ChatGatewayEventsEnum.RESPONSE_MESSAGE_BACKOFFICE,
      new ResponseDto(true, result, []),
    );
  }

  @SubscribeMessage(ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE)
  async requestListMessagesByIdentifierBackoffice(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: MessageListIdentifierWebsocketDto,
  ) {
    const result = await this.messageServiceBackoffice.listByConversationBackoffice(dto.client1, dto.client2);
    client.join(dto.identifier);
    this.server
      .to(dto.identifier)
      .emit(
        ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE,
        new ResponseDto(true, result, []),
      );
  }

  @SubscribeMessage(ChatGatewayEventsEnum.REQUEST_JOIN_ROOM_IDENTIFIER_BACKOFFICE)
  async joinRoomBackoffice(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: MessageListIdentifierWebsocketDto,
  ) {
    const convseration = await this.messageServiceBackoffice.listConversationByIdentifier(dto.identifier);
    client.join(dto.identifier);
    this.server
      .to(dto.identifier)
      .emit(
        ChatGatewayEventsEnum.RESPONSE_MESSAGE_IDENTIFIER_BACKOFFICE,
        new ResponseDto(true, convseration, null),
      );
  }



}
