import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-room-to-work' })
export class WorkRequestRoomToWorkEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 80,
    })
    room: string;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.roomsToBeWorked)
    workRequest: WorkRequestEntity;
}
