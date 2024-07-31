import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { MessageRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/message/register-message.dto';
import { MessageEntity } from 'src/modules/data-interaction/database/entitites/message.entity';
import { MessageRepository } from 'src/modules/data-interaction/database/repositories/user/message.repository';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatGatewayEventsEnum } from 'src/modules/data-interaction/database/enums/chat-gateway.enum';
import { ResponseDto } from 'src/core/dtos/response.dto';
import { UserWithLastMessage } from 'src/core/interfaces/userWithLastMessage.interface';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';

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

    async listConversationByIdentifier(identifier: string) {
        const msgList =  await this.messageRepository.listConversationByIdentifier(identifier);
        return msgList
    }
    
    async listAllMsgByUser(userId: string): Promise<UserWithLastMessage[]> {
        const user = await this.userRepository.getById(userId);
        const msgList = await this.messageRepository.listAllMsgByUser(user);
        
        const userMessagesMap: { [key: string]: UserWithLastMessage } = {};
    
        msgList.forEach(msg => {
            [msg.sender, msg.receiver].forEach(participant => {
                if (participant.id !== user.id) {
                    if (!userMessagesMap[participant.id] || userMessagesMap[participant.id].lastMessageTime < msg.sentAt) {
                        userMessagesMap[participant.id] = {
                            user: participant,
                            lastMessage: msg.content,
                            lastMessageTime: msg.sentAt,
                        };
                    }
                }
            });
        });
    
        const usersInvolved = Object.values(userMessagesMap);
        
        return usersInvolved;
    }

    async register(user1: string, user2:string,data: MessageRegisterRequestDto) {
      
        data.sender = await this.userRepository.getById(user1);
        data.receiver = await this.userRepository.getById(user2);
        data.identifier = data.sender.id.toString() + data.receiver.id.toString()
        const newMsg =  await super.create(data);
        return newMsg
    }

    async delete(messageId: string, userId: string) {
        const message = await this.messageRepository.findById(messageId);
        const sender = await this.userRepository.findById(userId)
        if (message.sender !== sender ) throw new Error('You did not send this menssage.')
        return await this.messageRepository.hardDelete(messageId);
    }
    
}
