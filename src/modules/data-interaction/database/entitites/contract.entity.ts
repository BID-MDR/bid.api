import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ContractStatusEnum } from '../enums/contract-status.enum';
import { CostEstimationEntity } from './cost-estimation.entity';
import { RenovationProjectEntity } from './renovation-project.entity';

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

    @Column({
        type: 'datetime',
        nullable: true,
    })
    professionalDeliveredContractToBeneficiaryAt: Date;

    @Column({
        type: 'datetime',
        nullable: true,
    })
    beneficiarySignedContractAt: Date;

    @OneToOne(() => RenovationProjectEntity, (renovationProject) => renovationProject.contract)
    renovationProject: RenovationProjectEntity;
}
