import { BaseEntity } from 'src/core/entities/base.entity';
import { RoomTypeEnum } from '../enums/room-type.enum';
import { RoomSolutionEntity } from './room-solution.entity';
import { WorkRequestEntity } from './work-request.entity';
export declare class RoomEntity extends BaseEntity {
    name: string;
    type: RoomTypeEnum;
    roomSolutions: RoomSolutionEntity[];
    workRequest: WorkRequestEntity;
}
