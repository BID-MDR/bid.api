import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FeatureNotificationService } from 'src/modules/business-logic/feature-notification/feature-notification.service';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;
  constructor(private featureNotificationService: FeatureNotificationService) {}

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
    async sendNotification(notification: any) {
        const notifications = await this.featureNotificationService.findAll();
        this.server.emit('notification', notifications);
    }
}
