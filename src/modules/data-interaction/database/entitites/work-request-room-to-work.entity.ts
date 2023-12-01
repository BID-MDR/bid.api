import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RoomTypeEnum } from '../enums/room-type.enum';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-room-to-work' })
export class WorkRequestRoomToWorkEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: RoomTypeEnum,
    })
    room: RoomTypeEnum;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.roomsToBeWorked)
    workRequest: WorkRequestEntity;
}
