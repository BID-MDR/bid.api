import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { RoomTypeEnum } from '../enums/room-type.enum';
import { WorkRequestEntity } from './work-request.entity';

@Entity({ name: 'work-request-room-type-quantity' })
export class WorkRequestRoomTypeQuantityEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: RoomTypeEnum,
    })
    room: RoomTypeEnum;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    quantity: number;

    @ManyToOne(() => WorkRequestEntity, (workRequest) => workRequest.roomsAvailableAndQuantity)
    workRequest: WorkRequestEntity;
}
