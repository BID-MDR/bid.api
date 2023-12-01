import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CostEstimationEntity } from './cost-estimation.entity';
import { ContractStatusEnum } from '../enums/contract-status.enum';

@Entity({ name: 'contract' })
export class ContractEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: ContractStatusEnum,
        default: ContractStatusEnum.INFORMACOES_PENDENTES,
    })
    status: ContractStatusEnum;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    validityFrom: Date;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    validityTo: Date;

    @OneToOne(() => CostEstimationEntity)
    @JoinColumn()
    costEstimation: CostEstimationEntity;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    professionalCancelMessage: string;
}
