import { Module } from '@nestjs/common';
import { FeatureUserModule } from './feature-user/feature-user.module';
import { FeatureTechnicalVisitModule } from './feature-technical-visit/feature-technical-visit.module';
import { FeatureAuthModule } from './feature-auth/feature-auth.module';
import { FeatureNotificationModule } from './feature-notification/feature-notification.module';
import { DemandModuleModule } from './demand/demand.module';
import { MessageModule } from './message/message.module';
import { WorkRequestModule } from './work-request/work-request.module';
import { FeatureRoomModule } from './feature-room/feature-room.module';
import { ConstructionsModule } from './feature-constructions/constructions.module';
import { HelpModule } from './help/help.module';
import { CompanyModule } from './feature-company/company.module';
@Module({
    imports: [
        FeatureUserModule,
        FeatureTechnicalVisitModule,
        FeatureAuthModule,
        FeatureNotificationModule,
        DemandModuleModule,
        MessageModule,
        WorkRequestModule,
        FeatureRoomModule,
        ConstructionsModule,
        HelpModule,
        CompanyModule
    ],
})
export class BusinessLogicModule {}
