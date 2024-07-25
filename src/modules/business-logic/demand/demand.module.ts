import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { DemandController } from './demand.controller';
import { DemandService } from './demand.service';

@Module({
    imports: [
        DatabaseModule,
        FacadeModule,

    ],
    controllers: [DemandController],
    providers: [DemandService],
})
export class DemandModuleModule {}
