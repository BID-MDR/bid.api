import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { MessageBackofficeEntity } from '../../../entitites/message-backoffice.entity';
import { MessageBackofficeRegisterRequestDto } from 'src/modules/backoffice/help/dto/message-register.dto';
import { UserBackofficeEntity } from '../../../entitites/user-backoffice.entity';
import { UserEntity } from '../../../entitites/user.entity';

@Injectable()
export class MessageBackofficeRepository extends BaseRepository<MessageBackofficeEntity, MessageBackofficeRegisterRequestDto, MessageBackofficeRegisterRequestDto> {
    constructor(@InjectRepository(MessageBackofficeEntity) private repository: Repository<MessageBackofficeEntity>) {
        super(repository);
    }

    async getById(_id: string) {
        return this.repository.findOne({ where: { id: _id } });
    }

    async listConversationByIdentifier(identifier: string): Promise<MessageBackofficeEntity[]> {
        // // Log para verificar o identifier recebido
        // console.log(`Filtering messages by identifier: ${identifier}`);


        const messages = await this.repository.find({
            where: { identifier },
            order: { sentAt: 'DESC' } // Ordena por data de envio, mais recente primeiro
        });


        return messages;
    }

    async listByConversation(user1: UserBackofficeEntity, user2: UserEntity): Promise<MessageBackofficeEntity[]> {
        return await this.repository.createQueryBuilder('message')
            .innerJoinAndSelect('message.sender', 'sender')
            .innerJoinAndSelect('message.receiver', 'receiver')
            .where('(sender.id = :user1Id AND receiver.id = :user2Id) OR (sender.id = :user2Id AND receiver.id = :user1Id)', { user1Id: user1.id, user2Id: user2.id })
            .orderBy('message.sentAt', 'ASC')
            .getMany();
    }

    async listByConversationBackoffice(user1: UserBackofficeEntity, user2: UserEntity): Promise<MessageBackofficeEntity[]> {
        return await this.repository.createQueryBuilder('message')
            .innerJoinAndSelect('message.sender', 'sender')
            .innerJoinAndSelect('message.receiver', 'receiver')
            .innerJoinAndSelect('message.senderBackoffice', 'senderBackoffice')
            .innerJoinAndSelect('message.receiverBackoffice', 'receiverBackoffice')
            .where('(sender.id = :user1Id AND receiver.id = :user2Id) OR (sender.id = :user2Id AND receiver.id = :user1Id) OR (senderBackoffice.id = :user1Id AND receiverBackoffice.id = :user2Id) OR (senderBackoffice.id = :user2Id AND receiverBackoffice.id = :user1Id)', { user1Id: user1.id, user2Id: user2.id })
            .orderBy('message.sentAt', 'ASC')
            .getMany();
    }

    async listAllMsgByUser(user: UserEntity): Promise<MessageBackofficeEntity[]> {
        return await this.repository.createQueryBuilder('message')
            .innerJoinAndSelect('message.sender', 'sender')
            .innerJoinAndSelect('message.receiver', 'receiver')
            .where('sender.id = :userId OR receiver.id = :userId', { userId: user.id })
            .orderBy('message.sentAt', 'DESC')
            .getMany();
    }

   async listAllMsgByUserBackoffice(user: UserEntity): Promise<MessageBackofficeEntity[]> {
  return await this.repository.createQueryBuilder('message')
    .leftJoinAndSelect('message.sender', 'sender')
    .leftJoinAndSelect('message.receiver', 'receiver')
    .leftJoinAndSelect('message.senderBackoffice', 'senderBackoffice')
    .leftJoinAndSelect('message.receiverBackoffice', 'receiverBackoffice')
    .where(
      'sender.id = :userId OR receiver.id = :userId OR senderBackoffice.id = :userId OR receiverBackoffice.id = :userId',
      { userId: user.id }
    )
    .orderBy('message.sentAt', 'DESC')
    .getMany();
}

    // async listAllMsgByUser(user1: UserEntity): Promise<MessageBackofficeEntity[]> {
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
