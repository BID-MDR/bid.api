import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FacadeModule } from './facade/facade.module';

@Module({
    imports: [DatabaseModule, FacadeModule],
})
export class DataInteractionModule {}
