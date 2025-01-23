import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';
import { NotificationMessageModule } from '../notification-msg/notification-message.module';

@Module({
    imports: [
        DatabaseModule,
        FacadeModule,
        NotificationMessageModule

    ],
    controllers: [DemandController],
    providers: [DemandService],
})
export class DemandModuleModule {}
