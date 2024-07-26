import { Module } from '@nestjs/common';
import { FeatureUserModule } from './feature-user/feature-user.module';
import { FeatureTechnicalVisitModule } from './feature-technical-visit/feature-technical-visit.module';
import { FeatureAuthModule } from './feature-auth/feature-auth.module';
import { FeatureNotificationModule } from './feature-notification/feature-notification.module';
import { DemandModuleModule } from './demand/demand.module';
import { WorkRequestModule } from './work-request/work-request.module';
@Module({
    imports: [
        FeatureUserModule,
        FeatureTechnicalVisitModule,
        FeatureAuthModule,
        FeatureNotificationModule,
        DemandModuleModule,
        WorkRequestModule
    ],
})
export class BusinessLogicModule {}
