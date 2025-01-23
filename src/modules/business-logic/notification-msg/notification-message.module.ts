import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { NotificationMessageController } from './notification-message.controller';
import { NotificationMessageService } from './notification-message.service';

@Module({
    imports: [
        DatabaseModule,
        FacadeModule,

    ],
    controllers: [NotificationMessageController],
    providers: [NotificationMessageService],
    exports: [NotificationMessageService]
})
export class NotificationMessageModule {}
