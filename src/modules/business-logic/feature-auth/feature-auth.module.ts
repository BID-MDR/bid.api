import { Module } from '@nestjs/common';
import { FeatureAuthController } from './feature-auth.controller';
import { FeatureAuthService } from './feature-auth.service';
import { GovbrModule } from 'src/modules/data-interaction/facade/apis/gov/govbr/govbr.module';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [GovbrModule, DatabaseModule, CoreModule],
    controllers: [FeatureAuthController],
    providers: [FeatureAuthService],
})
export class FeatureAuthModule {}
