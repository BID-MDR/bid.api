import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserWithLastMessage } from 'src/core/interfaces/userWithLastMessage.interface';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { NotificationMsgEntity } from 'src/modules/data-interaction/database/entitites/notification-msg.entity';
import { NotificationMessageRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/notificationMsg/register-notification-message.dto';
import { NotificationMsgRepository } from 'src/modules/data-interaction/database/repositories/notification-msg/notification-msg.repository';

@Injectable()
export class NotificationMessageService extends BaseService<
    NotificationMsgEntity,
    NotificationMessageRegisterRequestDto,
    NotificationMessageRegisterRequestDto
> {
    @WebSocketServer() server: Server;
    constructor(
        private notificationMessageRepository: NotificationMsgRepository,
        private readonly userRepository: UserRepository,
    ) {
        super(notificationMessageRepository);
    }

    async listConversation(user1: string) {
        const userEntity1 = await this.userRepository.getById(user1);
        return await this.notificationMessageRepository.listByConversation(userEntity1);
    }
    async markAsRead(notificationId: string) {
        return await this.notificationMessageRepository.markAsRead(notificationId);
    }
    async listConversationByIdentifier(identifier: string) {
        const msgList =  await this.notificationMessageRepository.listConversationByIdentifier(identifier);
        return msgList
    }
    
    async listAllMsgByUser(userId: string): Promise<UserWithLastMessage[]> {
        const user = await this.userRepository.getById(userId);
        const msgList = await this.notificationMessageRepository.listAllMsgByUser(user);
        
        const userMessagesMap: { [key: string]: UserWithLastMessage } = {};
    
        msgList.forEach(msg => {
            [ msg.receiver].forEach(participant => {
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

    async register(user1: string, data: NotificationMessageRegisterRequestDto) {
      
        data.sender = await this.userRepository.getById(user1);
        data.identifier = data.sender.id.toString()
        data.sentAt = new Date()
        const newMsg =  await super.create(data);
        return newMsg
    }

    async delete(messageId: string, userId: string) {
        const message = await this.notificationMessageRepository.findById(messageId);
        const receiver = await this.userRepository.findById(userId)
        if (message.receiver !== receiver ) throw new Error('You did not receive this menssage.')
        return await this.notificationMessageRepository.hardDelete(messageId);
    }
    
}
