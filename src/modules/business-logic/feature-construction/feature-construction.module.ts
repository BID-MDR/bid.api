import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { FeatureConstructionService } from './feature-construction.service';
import { ConstructionRepository } from 'src/modules/data-interaction/database/repositories/construction.repository';
import { FeatureConstructionController } from './feature-construction.controller';

@Module({
    imports: [DatabaseModule, FacadeModule],
    controllers: [FeatureConstructionController],
    providers: [FeatureConstructionService]
})
export class FeatureConstructionModule {}