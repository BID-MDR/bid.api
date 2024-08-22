import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FeatureNotificationController } from './feature-notification.controller';
import { FeatureNotificationService } from './feature-notification.service';

@Module({
    imports: [DatabaseModule],
    controllers: [FeatureNotificationController],
    providers: [FeatureNotificationService],
    exports: [FeatureNotificationService],
})
export class FeatureNotificationModule {}
