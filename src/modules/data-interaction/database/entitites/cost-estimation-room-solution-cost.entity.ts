import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RoomSolutionEnum } from '../enums/room-solution.enum';
import { RoomTypeEnum } from '../enums/room-type.enum';
import { CostEstimationEntity } from './cost-estimation.entity';

@Entity({ name: 'cost-estimation-room-solution-cost' })
export class CostEstimationRoomSolutionCostEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: RoomTypeEnum,
    })
    roomType: RoomTypeEnum;

    @Column({
        type: 'varchar',
        length: 70,
    })
    roomName: string;

    @Column({
        type: 'enum',
        enum: RoomSolutionEnum,
    })
    roomSolution: RoomSolutionEnum;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    cost: number;

    @ManyToOne(() => CostEstimationEntity, (costEstimation) => costEstimation.roomsSolutionsCosts)
    costEstimation: CostEstimationEntity;
}
