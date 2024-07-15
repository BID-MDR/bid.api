import { Module } from '@nestjs/common';
import { FeatureUserModule } from './feature-user/feature-user.module';
import { FeatureWorkRequestModule } from './feature-work-request/feature-work-request.module';
import { FeatureTechnicalVisitModule } from './feature-technical-visit/feature-technical-visit.module';
import { FeatureCostEstimationModule } from './feature-cost-estimation/feature-cost-estimation.module';
import { FeatureContractModule } from './feature-contract/feature-contract.module';
import { FeatureConstructionModule } from './feature-construction/feature-construction.module';
import { FeatureAuthModule } from './feature-auth/feature-auth.module';
import { FeatureNotificationModule } from './feature-notification/feature-notification.module';
@Module({
    imports: [
        FeatureUserModule,
        FeatureWorkRequestModule,
        FeatureTechnicalVisitModule,
        FeatureCostEstimationModule,
        FeatureContractModule,
        FeatureConstructionModule,
        FeatureAuthModule,
        FeatureNotificationModule,
    ],
})
export class BusinessLogicModule {}
