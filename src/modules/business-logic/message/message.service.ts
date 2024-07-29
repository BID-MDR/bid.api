import {  Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { DemandRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/demand/register-demand.dto';
import { MessageEntity } from 'src/modules/data-interaction/database/entitites/message.entity';
import { MessageRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/message/register-message.dto';
import { MessageRepository } from 'src/modules/data-interaction/database/repositories/user/message.repository';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatGatewayEventsEnum } from 'src/modules/data-interaction/database/enums/chat-gateway.enum';
import { ResponseDto } from 'src/core/dtos/response.dto';

@Injectable()
export class MessageService extends BaseService<
    MessageEntity,
    MessageRegisterRequestDto,
    MessageRegisterRequestDto
> {
    @WebSocketServer() server: Server;
    constructor(
        private messageRepository: MessageRepository,
        private readonly userRepository: UserRepository,
    ) {
        super(messageRepository);
    }

    async listConversation(user1: string, user2: string) {
        const userEntity1 = await this.userRepository.getById(user1);
        const userEntity2 = await this.userRepository.getById(user2);
        return await this.messageRepository.listByConversation(userEntity1, userEntity2);
    }

    async register(user1: string, user2:string,data: MessageRegisterRequestDto) {
        data.sender = await this.userRepository.getById(user1);
        data.receiver = await this.userRepository.getById(user2);
        data.identifier = data.sender.id + data.receiver.id
        const newMsg =  await super.create(data);
        this.server
        .to(newMsg.identifier)
        .emit(
            ChatGatewayEventsEnum.REQUEST_MESSAGE,
          new ResponseDto(true, newMsg, null),
        );
    }

    async delete(messageId: string, userId: string) {
        const message = await this.messageRepository.findById(messageId);
        const sender = await this.userRepository.findById(userId)
        if (message.sender !== sender ) throw new Error('You did not send this menssage.')
        return await this.messageRepository.hardDelete(messageId);
    }
    
}
