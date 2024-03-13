import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { RoomTypeEnum } from '../enums/room-type.enum';
import { RoomSolutionEntity } from './room-solution.entity';
import { WorkRequestRoomToWorkEntity } from './work-request-room-to-work.entity';
import { WorkRequestRoomTypeQuantityEntity } from './work-request-room-type-quantity.entity';

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 70,
    })
    name: string;

    @Column({
        type: 'enum',
        enum: RoomTypeEnum,
    })
    type: RoomTypeEnum;

    @OneToMany(() => RoomSolutionEntity, (roomSolution) => roomSolution.room)
    roomSolutions: RoomSolutionEntity[];

    @OneToOne(
        () => WorkRequestRoomTypeQuantityEntity,
        (workRequestRoomTypeQuantityEntity) => workRequestRoomTypeQuantityEntity.room,
    )
    workRequestRoomTypeQuantityEntity: WorkRequestRoomTypeQuantityEntity;

    @OneToMany(() => WorkRequestRoomToWorkEntity, (workRequestRoomToWork) => workRequestRoomToWork.room)
    workRequestsToBeWorked: WorkRequestRoomToWorkEntity[];
}
