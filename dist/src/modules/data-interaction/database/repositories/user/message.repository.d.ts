import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entitites/user.entity';
import { MessageEntity } from '../../entitites/message.entity';
import { MessageRegisterRequestDto } from '../../dtos/message/register-message.dto';
export declare class MessageRepository extends BaseRepository<MessageEntity, MessageRegisterRequestDto, MessageRegisterRequestDto> {
    private repository;
    constructor(repository: Repository<MessageEntity>);
    getById(_id: string): Promise<MessageEntity>;
    listConversationByIdentifier(identifier: string): Promise<MessageEntity[]>;
    listByConversation(user1: UserEntity, user2: UserEntity): Promise<MessageEntity[]>;
    listAllMsgByUser(user: UserEntity): Promise<MessageEntity[]>;
    list(): Promise<MessageEntity[]>;
}
