import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { HelpStatusEnum } from '../dtos/help/helpStatus.enum';
import { UserProgramTypeEnum } from '../enums/user-program-type.enum';

@Entity({ name: 'help' })
export class HelpEntity extends BaseEntity {
    //@ManyToOne(() => UserEntity, (user) => user.helpRequests, { eager: true })
    //user: UserEntity;

    @Column({
        type: "text",
    })
    content: string;

    @CreateDateColumn()
    sentAt: Date;

    @Column({
        type: "enum",
        enum: HelpStatusEnum,
        default: HelpStatusEnum.PENDING
    })
    status: HelpStatusEnum;

    @Column({
    type: "enum",
    enum: UserProgramTypeEnum,
    nullable: true,
    })
    programType: UserProgramTypeEnum;
}
