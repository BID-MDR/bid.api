import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { RoomSolutionEnum } from '../enums/room-solution.enum';
import { ConstructionEntity } from './construction.entity';
import { CostEstimationEntity } from './cost-estimation.entity';
import { RoomEntity } from './room.entity';
import { UserGeneratedMediaEntity } from './user-generated-media.entity';

@Entity({ name: 'room-solution' })
export class RoomSolutionEntity extends BaseEntity {
    @ManyToOne(() => RoomEntity, (room) => room.roomSolutions, {
        eager: true,
    })
    room: RoomEntity;

    @Column({
        type: 'enum',
        enum: RoomSolutionEnum,
    })
    solution: RoomSolutionEnum;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    cost: number;

    @OneToMany(() => UserGeneratedMediaEntity, (userGeneratedMediaEntity) => userGeneratedMediaEntity.roomSolution, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    picturesAndVideos: UserGeneratedMediaEntity[];

    @ManyToOne(() => CostEstimationEntity, (costEstimation) => costEstimation.roomsSolutions)
    costEstimation: CostEstimationEntity;

    @ManyToOne(() => ConstructionEntity, (construction) => construction.rooms)
    construction: ConstructionEntity;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    reference: number;
}
