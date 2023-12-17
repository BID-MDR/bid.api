import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { RoomEntity } from './room.entity';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-room-type-quantity' })
export class WorkRequestRoomTypeQuantityEntity extends BaseEntity {
    @OneToOne(() => RoomEntity, (room) => room.workRequestRoomTypeQuantityEntity, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    room: RoomEntity;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    quantity: number;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.roomsAvailableAndQuantity)
    workRequest: WorkRequestEntity;
}
