import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, } from 'typeorm';
import { RoomEntity } from './room.entity';
import { InterventionStatusEnum } from '../enums/intervention-status.enum';


@Entity({ name: 'intervention' })
export class InterventionEntity extends BaseEntity {
    @ManyToOne(() => RoomEntity, (room) => room.interventions, {
        onDelete: 'CASCADE',

    })
    room: RoomEntity;

    @Column({
        type: "varchar",
        length: 255,
    })
    value: string;

    @Column({
        type: "varchar",
        length: 500,
    })
    toDo: string;

    @Column({
        type:'enum',
        enum: InterventionStatusEnum,
        nullable: true
    })
    interventionSituation: InterventionStatusEnum;

    @Column({
        type: "varchar",
        length: 500,
        default: ''
    })
    interventiondescription: string;
}
