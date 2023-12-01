import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { RoomSolutionEnum } from '../enums/room-solution.enum';
import { RoomTypeEnum } from '../enums/room-type.enum';
import { CostEstimationEntity } from './cost-estimation.entity';
import { ConstructionRoomMediaEntity } from './construction-room-media.entity';
import { ConstructionEntity } from './construction.entity';

@Entity({ name: 'room-solution' })
export class RoomSolutionEntity extends BaseEntity {
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

    @OneToMany(() => ConstructionRoomMediaEntity, (constructionRoomMedia) => constructionRoomMedia.roomSolution, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    pictures: ConstructionRoomMediaEntity[];

    @ManyToOne(() => CostEstimationEntity, (costEstimation) => costEstimation.roomsSolutions)
    costEstimation: CostEstimationEntity;

    @ManyToOne(() => ConstructionEntity, (construction) => construction.rooms)
    construction: ConstructionEntity;
}
