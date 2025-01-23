import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FeatureTechnicalVisitController } from './feature-technical-visit.controller';
import { FeatureTechnicalVisitService } from './feature-technical-visit.service';
import { NotificationMessageModule } from '../notification-msg/notification-message.module';

@Module({
    imports: [DatabaseModule, NotificationMessageModule],
    controllers: [FeatureTechnicalVisitController],
    providers: [FeatureTechnicalVisitService],
})
export class FeatureTechnicalVisitModule {}
