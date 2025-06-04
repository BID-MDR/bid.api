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
import { UserBackofficeRepository } from 'src/modules/data-interaction/database/repositories/backoffice/user/user.repository';
import { MessageBackofficeRepository } from 'src/modules/data-interaction/database/repositories/backoffice/message/message.repository';
import { MessageBackofficeEntity } from 'src/modules/data-interaction/database/entitites/message-backoffice.entity';
import { MessageBackofficeRegisterRequestDto } from '../help/dto/message-register.dto';
import { UserWithLastMessageBackoffice } from '../help/interfaces/userWithLastMessage.interface';
import { UserBackofficeEntity } from 'src/modules/data-interaction/database/entitites/user-backoffice.entity';
import { MessageAppToBackofficeRegisterRequestDto } from '../help/dto/message-app-to-backoffice-register.dto';

@Injectable()
export class MessageBackofficeService extends BaseService<
    MessageBackofficeEntity,
    MessageBackofficeRegisterRequestDto,
    MessageBackofficeRegisterRequestDto
> {
    @WebSocketServer() server: Server;
    constructor(
        private messageRepository: MessageBackofficeRepository,
        private readonly userRepository: UserRepository,
        private readonly userBackofficeRepository: UserBackofficeRepository
    ) {
        super(messageRepository);
    }

    async listConversation(user1: string, user2: string) {
        const userEntity1 = await this.userBackofficeRepository.getById(user1);
        console.log('userEntity1',userEntity1);
        const userEntity2 = await this.userRepository.getById(user2);
         console.log('userEntity2',userEntity2);
        return await this.messageRepository.listByConversation(userEntity1, userEntity2);
    }

     async listByConversationBackoffice(user1: string, user2: string) {
        const userEntity1 = await this.userBackofficeRepository.getById(user1);
        console.log('userEntity1',userEntity1);
        const userEntity2 = await this.userRepository.getById(user2);
         console.log('userEntity2',userEntity2);
        return await this.messageRepository.listByConversationBackoffice(userEntity1, userEntity2);
    }

    async listConversationByIdentifier(identifier: string) {
        const msgList = await this.messageRepository.listConversationByIdentifier(identifier);
        return msgList
    }

    async listAllMsgByUser(userId: string): Promise<UserWithLastMessageBackoffice[]> {
        const user = await this.userRepository.getById(userId);
        const msgList = await this.messageRepository.listAllMsgByUserBackoffice(user);

        const userMessagesMap: { [key: string]: UserWithLastMessageBackoffice } = {};

        msgList.forEach(msg => {
            [msg.sender, msg.receiver, msg.senderBackoffice, msg.receiverBackoffice].forEach(participant => {
                if (participant instanceof UserBackofficeEntity && participant.id !== user.id) {
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

    async registerAppToBackoffice(user1: string, user2: string, data: MessageAppToBackofficeRegisterRequestDto) {
        data.sender = await this.userRepository.getById(user1);
        data.receiverBackoffice = await this.userBackofficeRepository.getById(user2);
        data.identifier = data.sender.id.toString() + data.receiver.id.toString()
        const newMsg = await super.create(data);
        return newMsg
    }

      async registerBackofficeToApp(user1: string, user2: string, data: MessageAppToBackofficeRegisterRequestDto) {
        console.log('teste');
        data.senderBackoffice = await this.userBackofficeRepository.getById(user1);
        console.log('data.senderBackoffice',data.senderBackoffice);
        data.receiver = await this.userRepository.getById(user2);
        console.log('data.receiver',data.receiver);
        data.identifier = data.senderBackoffice.id.toString() + data.receiver.id.toString()
        const newMsg = await super.create(data);
        return newMsg
    }

    async register(user1: string, user2: string, data: MessageBackofficeRegisterRequestDto) {

        data.senderBackoffice = await this.userBackofficeRepository.getById(user1);
        data.receiver = await this.userRepository.getById(user2);
        data.identifier = data.sender.id.toString() + data.receiver.id.toString()
        const newMsg = await super.create(data);
        return newMsg
    }

    async delete(messageId: string, userId: string) {
        const message = await this.messageRepository.findById(messageId);
        const sender = await this.userBackofficeRepository.findById(userId)
        //if (message.sender !== sender) throw new Error('You did not send this menssage.')
        return await this.messageRepository.hardDelete(messageId);
    }

}
