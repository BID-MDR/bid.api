import { BaseService } from 'src/core/services/base.service';
import { MessageRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/message/register-message.dto';
import { MessageEntity } from 'src/modules/data-interaction/database/entitites/message.entity';
import { MessageRepository } from 'src/modules/data-interaction/database/repositories/user/message.repository';
import { Server } from 'socket.io';
import { UserWithLastMessage } from 'src/core/interfaces/userWithLastMessage.interface';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
export declare class MessageService extends BaseService<MessageEntity, MessageRegisterRequestDto, MessageRegisterRequestDto> {
    private messageRepository;
    private readonly userRepository;
    server: Server;
    constructor(messageRepository: MessageRepository, userRepository: UserRepository);
    listConversation(user1: string, user2: string): Promise<MessageEntity[]>;
    listConversationByIdentifier(identifier: string): Promise<MessageEntity[]>;
    listAllMsgByUser(userId: string): Promise<UserWithLastMessage[]>;
    register(user1: string, user2: string, data: MessageRegisterRequestDto): Promise<MessageEntity>;
    delete(messageId: string, userId: string): Promise<void>;
}
