import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MediaTypeEnum } from '../enums/media-type.enum';
import { RoomSolutionEntity } from './room-solution.entity';
import { RoomEntity } from './room.entity';
@Entity({ name: 'user-generated-media' })
export class UserGeneratedMediaEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 200,
    })
    url: string;

    @Column({
        type: 'enum',
        enum: MediaTypeEnum,
    })
    type: MediaTypeEnum;

    @ManyToOne(() => RoomSolutionEntity, (roomSolution) => roomSolution.picturesAndVideos)
    roomSolution: RoomSolutionEntity;

    @ManyToOne(() => RoomEntity, (room) => room.startWorkPhotos, {
        onDelete: 'CASCADE',
    })
    startWorkRoom: RoomEntity;
    
    @ManyToOne(() => RoomEntity, (room) => room.endWorkPhotos, {
        onDelete: 'CASCADE',
    })
    endWorkRoom: RoomEntity;
}
