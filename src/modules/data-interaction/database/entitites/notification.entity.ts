import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'notification' })
export class NotificationEntity extends BaseEntity {
    @Column({
        type: 'boolean',
        default: false,
    })
    allowProfileListing: boolean;

    @ManyToOne(() => UserEntity, (user) => user.notificationUser)
    user: UserEntity;
}
