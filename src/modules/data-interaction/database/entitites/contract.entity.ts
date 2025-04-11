import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';;
import { WorkRequestEntity } from './work-request.entity';
import { ContractStatusEnum } from '../enums/contract-status.enum';
import { ContractCancelReasonEnum } from '../enums/contract-cancel-reason.enum';
import { TechnicalVisitEntity } from './technical-visit.entity';
import { UserProfessionalInfoEntity } from './user-professional-info.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'contract' })
export class ContractEntity extends BaseEntity {


    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.contracts, {
        onDelete: 'CASCADE',
      })
      @JoinColumn()
      workRequest: WorkRequestEntity;

    @Column({
        type: "varchar",
        length: 255,
        default: '0'
    })
    total: string;

    @Column({
        type: "varchar",
        length: 500,
        default: ''
    })
    resume: string;

    @Column({
        type: 'enum',
        enum: ContractStatusEnum,
        default: ContractStatusEnum.PENDING
    })
    status: ContractStatusEnum;

    @Column({
        type: 'datetime',
        default: null

    })
    startDate?: Date;

    @Column({
        type: 'datetime',
        default: null
    })
    endDate?: Date;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    acceptDate: Date;

    @Column({
        type: "varchar",
        length: 500,
        default: ''
    })
    adjustRequested: string;

    @Column({
        type: "varchar",
        length: 500,
        default: ''
    })
    cancelationReason: string;

    @Column({
        type: 'enum',
        enum: ContractCancelReasonEnum,
        default: ContractCancelReasonEnum.NOT_APPLY
    })
    cancelReasonEnum: ContractCancelReasonEnum

    @OneToMany(() => TechnicalVisitEntity, technicalVisit => technicalVisit.contract, {
        eager: true,
    })
    technicalVisit: TechnicalVisitEntity;

    //@ManyToOne(() => UserEntity, (profeesional) => profeesional.contractList)
    //professional: UserEntity;
    

}
