import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { ChatService } from './services/chat.service';
import { CoreModule } from 'src/core/core.module';
import { MessageModule } from 'src/modules/business-logic/message/message.module';

@Module({
    imports: [CoreModule, MessageModule],
    providers: [ChatGateway, ChatService],
})
export class WebsoketModule {}
