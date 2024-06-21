import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FeatureUserService } from './feature-user.service';
import { FeatureUserController } from './feature-user.controller';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { FeatureAuthModule } from '../feature-auth/feature-auth.module';

@Module({
    imports: [DatabaseModule, FacadeModule, FeatureAuthModule],
    providers: [FeatureUserService],
    controllers: [FeatureUserController],
})
export class FeatureUserModule {}
