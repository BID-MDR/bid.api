import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FacadeModule } from './facade/facade.module';
import { WebsoketModule } from './websoket/websoket.module';

@Module({
    imports: [DatabaseModule, FacadeModule, WebsoketModule],
})
export class DataInteractionModule {}
