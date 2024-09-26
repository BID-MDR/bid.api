import { CreateRoomDto } from 'src/modules/data-interaction/database/dtos/room/create-room.dto';
import { FeatureRoomService } from './feature-room.service';
import { CreateRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/create-room-solution.dto';
import { RequestRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/request.dto';
export declare class FeatureRoomController {
    private featureRoomService;
    constructor(featureRoomService: FeatureRoomService);
    list(): Promise<any>;
    listByWorkRequest(id: string): Promise<any>;
    listByWorkRequestId(id: string): Promise<any[]>;
    getById(id: string): Promise<import("../../data-interaction/database/entitites/room.entity").RoomEntity>;
    getRoom(id: string): Promise<import("../../data-interaction/database/entitites/room.entity").RoomEntity>;
    create(body: CreateRoomDto): Promise<import("../../data-interaction/database/entitites/room.entity").RoomEntity>;
    createRoomSolution(body: CreateRoomSolutionDto): Promise<import("../../data-interaction/database/entitites/room-solution.entity").RoomSolutionEntity>;
    waitIntervention(body: RequestRoomSolutionDto): Promise<void>;
    selectSolutions(id: string): Promise<any[]>;
}
