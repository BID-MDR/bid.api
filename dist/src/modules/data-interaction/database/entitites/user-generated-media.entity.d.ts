import { BaseEntity } from 'src/core/entities/base.entity';
import { MediaTypeEnum } from '../enums/media-type.enum';
import { RoomSolutionEntity } from './room-solution.entity';
export declare class UserGeneratedMediaEntity extends BaseEntity {
    url: string;
    type: MediaTypeEnum;
    roomSolution: RoomSolutionEntity;
}
