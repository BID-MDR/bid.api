import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { RoomSolutionEnum } from '../enums/room-solution.enum';
import { RoomEntity } from './room.entity';
import { UserGeneratedMediaEntity } from './user-generated-media.entity';

@Entity({ name: 'room_solution' })
export class RoomSolutionEntity extends BaseEntity {
    @ManyToOne(() => RoomEntity, (room) => room.roomSolutions, {
        eager: true,
    })
    room: RoomEntity;

    @Column({
        type: 'enum',
        enum: RoomSolutionEnum,
    })
    solution: RoomSolutionEnum;

    @OneToMany(() => UserGeneratedMediaEntity, (userGeneratedMediaEntity) => userGeneratedMediaEntity.roomSolution, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    picturesAndVideos: UserGeneratedMediaEntity[];
}
