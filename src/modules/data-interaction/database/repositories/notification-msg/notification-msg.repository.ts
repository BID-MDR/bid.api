import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { LessThan, Repository } from 'typeorm';
import { UserEntity } from '../../entitites/user.entity';

import { NotificationMsgEntity } from '../../entitites/notification-msg.entity';
import { NotificationMessageRegisterRequestDto } from '../../dtos/notificationMsg/register-notification-message.dto';

@Injectable()
export class NotificationMsgRepository extends BaseRepository<NotificationMsgEntity, NotificationMessageRegisterRequestDto, NotificationMessageRegisterRequestDto> {
    constructor(@InjectRepository(NotificationMsgEntity) private repository: Repository<NotificationMsgEntity>) {
        super(repository);
    }

    async getById(_id: string) {
        return this.repository.findOne({ where: { id: _id } });
    }

    async listConversationByIdentifier(identifier: string): Promise<NotificationMsgEntity[]> {
  
        const messages = await this.repository.find({
            where: { identifier },
            order: { sentAt: 'DESC' } 
        });
        
  
        return messages;
    }

    async markAsRead(notificationId: string, ) {
        return await this.repository.update({ id: notificationId }, {readAt: new Date(), isRead: true});
    
    }
    async findOlderThanAWeek(): Promise<NotificationMsgEntity[]> {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
        return this.repository.find({
          where: { readAt: LessThan(oneWeekAgo), isRead: true },
          
        });
      }

    async listByConversation(user1: UserEntity): Promise<NotificationMsgEntity[]> {
        return await this.repository.createQueryBuilder('message')
            .innerJoinAndSelect('message.receiver', 'receiver')
            .where('receiver.id = :user2Id', { user1Id: user1.id })
            .orderBy('message.sentAt', 'ASC')
            .getMany();
    }

    async listAllMsgByUser(user: UserEntity): Promise<NotificationMsgEntity[]> {
        
        return await this.repository.createQueryBuilder('message')
        .innerJoinAndSelect('message.receiver', 'receiver')
        .where('receiver.id = :userId', { userId: user.id })
        .orderBy('message.sentAt', 'DESC')
        .getMany();
    }

    async list() {
        return this.repository.find();
    }

   
}
