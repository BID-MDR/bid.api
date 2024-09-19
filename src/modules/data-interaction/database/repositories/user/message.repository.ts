import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entitites/user.entity';
import { MessageEntity } from '../../entitites/message.entity';
import { MessageRegisterRequestDto } from '../../dtos/message/register-message.dto';

@Injectable()
export class MessageRepository extends BaseRepository<MessageEntity, MessageRegisterRequestDto, MessageRegisterRequestDto> {
    constructor(@InjectRepository(MessageEntity) private repository: Repository<MessageEntity>) {
        super(repository);
    }

    async getById(_id: string) {
        return this.repository.findOne({ where: { id: _id } });
    }

    async listConversationByIdentifier(identifier: string): Promise<MessageEntity[]> {
        // // Log para verificar o identifier recebido
        // console.log(`Filtering messages by identifier: ${identifier}`);
        
        
        const messages = await this.repository.find({
            where: { identifier },
            order: { sentAt: 'DESC' } // Ordena por data de envio, mais recente primeiro
        });
        
  
        return messages;
    }

    async listByConversation(user1: UserEntity, user2: UserEntity): Promise<MessageEntity[]> {
        return await this.repository.createQueryBuilder('message')
            .innerJoinAndSelect('message.sender', 'sender')
            .innerJoinAndSelect('message.receiver', 'receiver')
            .where('(sender.id = :user1Id AND receiver.id = :user2Id) OR (sender.id = :user2Id AND receiver.id = :user1Id)', { user1Id: user1.id, user2Id: user2.id })
            .orderBy('message.sentAt', 'ASC')
            .getMany();
    }

    async listAllMsgByUser(user: UserEntity): Promise<MessageEntity[]> {
        
        return await this.repository.createQueryBuilder('message')
        .innerJoinAndSelect('message.sender', 'sender')
        .innerJoinAndSelect('message.receiver', 'receiver')
        .where('sender.id = :userId OR receiver.id = :userId', { userId: user.id })
        .orderBy('message.sentAt', 'DESC')
        .getMany();
    }
    // async listAllMsgByUser(user1: UserEntity): Promise<MessageEntity[]> {
    //     return await this.repository.createQueryBuilder('message')
    //         .innerJoinAndSelect('message.sender', 'sender')
    //         .innerJoinAndSelect('message.receiver', 'receiver')
    //         .where(
    //             '(sender.id = :user1Id AND receiver.id = :user1Id) OR (sender.id = :user1Id AND receiver.id = :user1Id)',
    //             { user1Id: user1.id }
    //         )
    //         .orderBy('message.sentAt', 'ASC')
    //         .getMany();
    // }
    async list() {
        return this.repository.find();
    }

   
}
