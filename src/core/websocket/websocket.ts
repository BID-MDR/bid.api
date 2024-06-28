import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FeatureNotificationService } from 'src/modules/business-logic/feature-notification/feature-notification.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private notificationService: FeatureNotificationService) {}

  afterInit(server: Server) {
    console.log('WebSocket initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
    this.sendNotifications();
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  async sendNotifications() {
    const notifications = await this.notificationService.findAll();
    this.server.emit('notification', notifications);
  }
}
