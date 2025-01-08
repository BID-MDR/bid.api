import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, } from 'typeorm';
import { RoomEntity } from './room.entity';


@Entity({ name: 'intervention' })
export class InterventionEntity extends BaseEntity {
    @ManyToOne(() => RoomEntity, (room) => room.interventions, {
        onDelete: 'CASCADE',
        eager: true
    })
    room: RoomEntity;

    @Column({
        type: "varchar",
        length: 255,
    })
    value: string;
}
