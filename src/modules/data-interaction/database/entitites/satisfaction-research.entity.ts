import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { WorkRequestEntity } from './work-request.entity';
import { UserEntity } from './user.entity';
import { UserProgramTypeEnum } from '../enums/user-program-type.enum';

@Entity({ name: 'satisfaction_research' })
export class SatisfactionResearchEntity extends BaseEntity {
    @Column({
        type: 'int',
    })
    programGrade: number;

    @Column({
        type: 'int',
    })
    plataformGrade: number;

    @Column({
        type: 'int',
    })
    professionalGrade: number;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
      })
      comments: string;
    
    @Column({
    type: "enum",
    enum: UserProgramTypeEnum,
    nullable: true,
    })
    programType: UserProgramTypeEnum;

    //@ManyToOne(() => UserEntity, (user) => user.satisfaction)
    //@JoinColumn({ name: 'user_id' }) 
    //user: UserEntity;

    @ManyToOne(()=> WorkRequestEntity, (workRequest) => workRequest.satisfaction)
    @JoinColumn() 
    workRequest: WorkRequestEntity;

}
