import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomEntity } from './room.entity';
import { CostEstimateStatusEnum } from '../enums/cost-estimate-status.enum';
import { WorkRequestEntity } from './work-request.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'cost_estimate' })
export class CostEstimateEntity extends BaseEntity {

    @ManyToMany(() => RoomEntity, (room) => room.costEstimates)
    rooms: RoomEntity[];
  
    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.costEstimates, {
        onDelete: 'CASCADE',
    })
    workRequest: WorkRequestEntity;

    @Column({
        type: "varchar",
        length: 255,
        default: ''

    })
    total: string;

    @Column({
        type: "varchar",
        length: 500,
        default: ''
    })
    adjustDetails: string;

    @Column({
        type: 'enum',
        enum: CostEstimateStatusEnum,
        default: CostEstimateStatusEnum.PENDING
    })
    type: CostEstimateStatusEnum;

    @Column({
        type: "varchar",
        length: 500,
        default: ''
    })
    estimateDate: String;

    @ManyToOne(() => UserEntity, user => user.id, {
    })
    professional: UserEntity;

}
