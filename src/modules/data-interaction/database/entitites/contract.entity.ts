import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';;
import { WorkRequestEntity } from './work-request.entity';
import { ContractStatusEnum } from '../enums/contract-status.enum';
import { ContractCancelReasonEnum } from '../enums/contract-cancel-reason.enum';
import { TechnicalVisitEntity } from './technical-visit.entity';

@Entity({ name: 'contract' })
export class ContractEntity extends BaseEntity {


    @OneToOne(() => WorkRequestEntity, (workRequest) => workRequest.contract, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    workRequest: WorkRequestEntity;

    @Column({
        type: "varchar",
        length: 255,
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
    })
    startDate: Date;
    @Column({
        type: 'datetime',
    })
    endDate: Date;

    @Column({
        type: 'datetime',
        nullable: true
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

}
