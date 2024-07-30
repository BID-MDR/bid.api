import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { MessageRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/message/register-message.dto';
import { MessageEntity } from 'src/modules/data-interaction/database/entitites/message.entity';
import { MessageRepository } from 'src/modules/data-interaction/database/repositories/user/message.repository';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';

@Injectable()
export class MessageService extends BaseService<
    MessageEntity,
    MessageRegisterRequestDto,
    MessageRegisterRequestDto
> {
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

        return await super.create(data);
    }

    async delete(messageId: string, userId: string) {
        const message = await this.messageRepository.findById(messageId);
        const sender = await this.userRepository.findById(userId)
        if (message.sender !== sender ) throw new Error('You did not send this menssage.')
        return await this.messageRepository.hardDelete(messageId);
    }
    
}
