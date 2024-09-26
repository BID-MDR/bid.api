import { BaseEntity } from 'src/core/entities/base.entity';
import { RoomSolutionEnum } from '../enums/room-solution.enum';
import { RoomEntity } from './room.entity';
import { UserGeneratedMediaEntity } from './user-generated-media.entity';
export declare class RoomSolutionEntity extends BaseEntity {
    room: RoomEntity;
    solution: RoomSolutionEnum;
    picturesAndVideos: UserGeneratedMediaEntity[];
}
