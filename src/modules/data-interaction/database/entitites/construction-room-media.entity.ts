import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ConstructionRoomTypeEnum } from '../enums/construction-room-type.enum';
import { RoomSolutionEntity } from './room-solution.entity';

@Entity({ name: 'construction-room-media' })
export class ConstructionRoomMediaEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 200,
    })
    data: string;

    @Column({
        type: 'enum',
        enum: ConstructionRoomTypeEnum,
    })
    type: ConstructionRoomTypeEnum;

    @ManyToOne(() => RoomSolutionEntity, (roomSolution) => roomSolution.pictures)
    roomSolution: RoomSolutionEntity;
}
