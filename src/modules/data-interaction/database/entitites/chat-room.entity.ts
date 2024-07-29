import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity({ name: 'chat_rooms' })
export class ChatRoomEntity extends BaseEntity {
    @Column({
        type: "text",
    })
    name: string;

    @OneToMany(() => MessageEntity, (message) => message.chatRoom)
    messages: MessageEntity[];
}
