import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { ChatService } from './services/chat.service';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [CoreModule],
    providers: [ChatGateway, ChatService],
})
export class WebsoketModule {}
