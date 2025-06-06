import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ChatRoomEntity } from './chat-room.entity';
import { UserBackofficeEntity } from './user-backoffice.entity';

@Entity({ name: 'messages_backoffice' })
export class MessageBackofficeEntity extends BaseEntity {
    @ManyToOne(() => UserBackofficeEntity, (user) => user.sentMessages, { eager: true })
    senderBackoffice?: UserBackofficeEntity;

    @ManyToOne(() => UserBackofficeEntity, (user) => user.receivedMessages, { eager: true })
    receiverBackoffice?: UserBackofficeEntity;

    @ManyToOne(() => UserEntity, (user) => user.sentMessages, { eager: true })
    sender?: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.receivedMessages, { eager: true })
    receiver?: UserEntity;

    // @ManyToOne(() => ChatRoomEntity, (chatRoom) => chatRoom.messages, { eager: true })
    // chatRoom: ChatRoomEntity;

    @Column({
        type: "text",
    })
    content: string;

    @CreateDateColumn()
    sentAt: Date;

    @Column({
        type: "boolean",
        default: false,
    })
    isRead: boolean;

    @Column({
        type: "text",
    })
    identifier: string;

}
