import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/data-interaction/database/database.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
    imports: [
        DatabaseModule,
        FacadeModule,

    ],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService]
})
export class MessageModule {}
