import { BaseService } from 'src/core/services/base.service';
import { Server } from 'socket.io';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { UserBackofficeRepository } from 'src/modules/data-interaction/database/repositories/backoffice/user/user.repository';
import { MessageBackofficeRepository } from 'src/modules/data-interaction/database/repositories/backoffice/message/message.repository';
import { MessageBackofficeEntity } from 'src/modules/data-interaction/database/entitites/message-backoffice.entity';
import { MessageBackofficeRegisterRequestDto } from '../help/dto/message-register.dto';
import { UserWithLastMessageBackoffice } from '../help/interfaces/userWithLastMessage.interface';
export declare class MessageBackofficeService extends BaseService<MessageBackofficeEntity, MessageBackofficeRegisterRequestDto, MessageBackofficeRegisterRequestDto> {
    private messageRepository;
    private readonly userRepository;
    private readonly userBackofficeRepository;
    server: Server;
    constructor(messageRepository: MessageBackofficeRepository, userRepository: UserRepository, userBackofficeRepository: UserBackofficeRepository);
    listConversation(user1: string, user2: string): Promise<MessageBackofficeEntity[]>;
    listConversationByIdentifier(identifier: string): Promise<MessageBackofficeEntity[]>;
    listAllMsgByUser(userId: string): Promise<UserWithLastMessageBackoffice[]>;
    register(user1: string, user2: string, data: MessageBackofficeRegisterRequestDto): Promise<MessageBackofficeEntity>;
    delete(messageId: string, userId: string): Promise<void>;
}
