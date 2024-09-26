import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FeatureNotificationService } from 'src/modules/business-logic/feature-notification/feature-notification.service';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private notificationService;
    server: Server;
    constructor(notificationService: FeatureNotificationService);
    afterInit(server: Server): void;
    handleConnection(client: any, ...args: any[]): void;
    handleDisconnect(client: any): void;
    sendNotifications(): Promise<void>;
}
