import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FeatureUserService } from './feature-user.service';
import { FeatureUserController } from './feature-user.controller';

@Module({
    imports: [DatabaseModule],
    providers: [FeatureUserService],
    controllers: [FeatureUserController],
})
export class FeatureUserModule {}
