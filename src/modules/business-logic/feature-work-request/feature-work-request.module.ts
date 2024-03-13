import { Module } from '@nestjs/common';
import { FeatureWorkRequestController } from './feature-work-request.controller';
import { FeatureWorkRequestService } from './feature-work-request.service';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';

@Module({
    imports: [DatabaseModule, FacadeModule],
    controllers: [FeatureWorkRequestController],
    providers: [FeatureWorkRequestService],
})
export class FeatureWorkRequestModule {}
