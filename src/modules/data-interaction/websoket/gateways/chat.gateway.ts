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

@WebSocketGateway({
    path: '/socket/chat',
    cors: {
        origin: '*',
        allowedHeaders: 'Authorization',
        credentials: true,
    },
})
@UseGuards(SocketGuard)
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) {}

    @SubscribeMessage('send_message')
    listenForMessages(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {
        this.server.sockets.emit('receive_message', message);
        return message;
    }

    handleConnection(client: Socket) {
        this.chatService.authenticateUser(client);
    }
}
