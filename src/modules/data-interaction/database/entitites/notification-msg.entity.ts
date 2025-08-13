import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ChatRoomEntity } from './chat-room.entity';

@Entity({ name: 'notifcation_msg' })
export class NotificationMsgEntity extends BaseEntity {


    @ManyToOne(() => UserEntity, (user) => user.receivedMessages, { eager: true })
    receiver: UserEntity;

    @Column({
        type: "text",
        default: ''

    })
    content: string;

    @CreateDateColumn()
    sentAt: Date;

    @Column({
        type: "boolean",
        default: false,
    })
    isRead: boolean;

    @CreateDateColumn()
    readAt?: Date;

    @Column({
        type: "text",
        default: ''
    })
    identifier: string;

}
