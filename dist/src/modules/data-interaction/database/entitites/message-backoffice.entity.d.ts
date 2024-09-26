import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from './user.entity';
import { UserBackofficeEntity } from './user-backoffice.entity';
export declare class MessageBackofficeEntity extends BaseEntity {
    sender: UserBackofficeEntity;
    receiver: UserEntity;
    content: string;
    sentAt: Date;
    isRead: boolean;
    identifier: string;
}
