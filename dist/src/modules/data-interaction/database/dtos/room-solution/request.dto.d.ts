import { RoomEntity } from "../../entitites/room.entity";
import { RoomSolutionEnum } from "../../enums/room-solution.enum";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
export declare class RequestRoomSolutionDto {
    roomId: string;
    room: RoomEntity;
    solution: Array<RoomSolutionEnum>;
    workRequestId: string;
    workRequest: WorkRequestEntity;
}
