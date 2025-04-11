import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { ChatRoomEntity } from './chat-room.entity';

@Entity({ name: 'messages' })
export class MessageEntity extends BaseEntity {
    //@ManyToOne(() => UserEntity, (user) => user.sentMessages, { eager: true })
    //sender: UserEntity;

    //@ManyToOne(() => UserEntity, (user) => user.receivedMessages, { eager: true })
    //receiver: UserEntity;

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
