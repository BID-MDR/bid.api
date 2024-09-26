import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from './user.entity';
export declare class NotificationEntity extends BaseEntity {
    allowProfileListing: boolean;
    user: UserEntity;
}
