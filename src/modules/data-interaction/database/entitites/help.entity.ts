import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'help' })
export class HelpEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (user) => user.helpRequests, { eager: true })
    user: UserEntity;

    @Column({
        type: "text",
    })
    content: string;

    @CreateDateColumn()
    sentAt: Date;
}
