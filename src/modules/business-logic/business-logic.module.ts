import { Module } from '@nestjs/common';
import { FeatureUserModule } from './feature-user/feature-user.module';
import { FeatureWorkRequestModule } from './feature-work-request/feature-work-request.module';
import { FeatureTechnicalVisitModule } from './feature-technical-visit/feature-technical-visit.module';

@Module({
    imports: [FeatureUserModule, FeatureWorkRequestModule, FeatureTechnicalVisitModule],
})
export class BusinessLogicModule {}
