import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from './user.entity';
export declare class MessageEntity extends BaseEntity {
    sender: UserEntity;
    receiver: UserEntity;
    content: string;
    sentAt: Date;
    isRead: boolean;
    identifier: string;
}
