import { Module } from '@nestjs/common';
import { FeatureUserModule } from './feature-user/feature-user.module';

@Module({
  imports: [FeatureUserModule]
})
export class BusinessLogicModule {}
