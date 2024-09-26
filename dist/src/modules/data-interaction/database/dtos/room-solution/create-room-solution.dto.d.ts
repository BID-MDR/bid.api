import { RoomEntity } from '../../entitites/room.entity';
import { RoomSolutionEnum } from '../../enums/room-solution.enum';
export declare class CreateRoomSolutionDto {
    constructor(partial: Partial<CreateRoomSolutionDto>);
    roomId: string;
    room: RoomEntity;
    solution: RoomSolutionEnum;
}
