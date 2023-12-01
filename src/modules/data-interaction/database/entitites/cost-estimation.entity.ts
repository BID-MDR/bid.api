import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CostEstimationStatusEnum } from '../enums/cost-estimation-status.enum';
import { UserEntity } from './user.entity';
import { ProfessionalDeclineResponseEnum } from '../enums/professional-decline-response.enum';
import { WorkRequestEntity } from './work-request.entity';
import { CostEstimationRoomSolutionCostEntity } from './cost-estimation-room-solution-cost.entity';

@Entity({ name: 'cost-estimation' })
export class CostEstimationEntity extends BaseEntity {
    @Column({
        enum: CostEstimationStatusEnum,
        type: 'enum',
        default: CostEstimationStatusEnum.PENDENTE,
    })
    status: CostEstimationStatusEnum;

    @ManyToOne(() => UserEntity)
    professional: UserEntity;

    @Column({
        type: 'enum',
        enum: ProfessionalDeclineResponseEnum,
        nullable: true,
    })
    professionalDeclineResponse: ProfessionalDeclineResponseEnum;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: true,
    })
    beneficiaryAdjustmentResponse: string;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.costEstimations)
    workRequest: WorkRequestEntity;

    @OneToMany(() => CostEstimationRoomSolutionCostEntity, (roomSolutionCost) => roomSolutionCost.costEstimation, {
        cascade: true,
        eager: true,
    })
    roomsSolutionsCosts: CostEstimationRoomSolutionCostEntity[];

    @Column({
        type: 'smallint',
        unsigned: true,
    })
    estimatedTimeToExecute: number;
}
