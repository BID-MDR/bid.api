import { BaseEntity } from 'src/core/entities/base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { RoomEntity } from './room.entity';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-room-to-work' })
export class WorkRequestRoomToWorkEntity extends BaseEntity {
    @ManyToOne(() => RoomEntity, (room) => room.workRequestsToBeWorked, {
        eager: true,
    })
    room: RoomEntity;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.roomsToBeWorked)
    workRequest: WorkRequestEntity;
}
