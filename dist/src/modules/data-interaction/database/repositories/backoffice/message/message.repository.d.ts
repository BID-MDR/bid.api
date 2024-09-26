import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { MessageBackofficeEntity } from '../../../entitites/message-backoffice.entity';
import { MessageBackofficeRegisterRequestDto } from 'src/modules/backoffice/help/dto/message-register.dto';
import { UserBackofficeEntity } from '../../../entitites/user-backoffice.entity';
import { UserEntity } from '../../../entitites/user.entity';
export declare class MessageBackofficeRepository extends BaseRepository<MessageBackofficeEntity, MessageBackofficeRegisterRequestDto, MessageBackofficeRegisterRequestDto> {
    private repository;
    constructor(repository: Repository<MessageBackofficeEntity>);
    getById(_id: string): Promise<MessageBackofficeEntity>;
    listConversationByIdentifier(identifier: string): Promise<MessageBackofficeEntity[]>;
    listByConversation(user1: UserBackofficeEntity, user2: UserEntity): Promise<MessageBackofficeEntity[]>;
    listAllMsgByUser(user: UserBackofficeEntity): Promise<MessageBackofficeEntity[]>;
    list(): Promise<MessageBackofficeEntity[]>;
}
