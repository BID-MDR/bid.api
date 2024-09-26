import { BaseRepository } from "src/core/repositories/base.repository";
import { Repository } from "typeorm";
import { CreateRoomDto } from "../../dtos/room/create-room.dto";
import { UpdateRoomDto } from "../../dtos/room/update-room.dto";
import { RoomEntity } from "../../entitites/room.entity";
export declare class RoomRepository extends BaseRepository<RoomEntity, CreateRoomDto, UpdateRoomDto> {
    private repository;
    constructor(repository: Repository<RoomEntity>);
    findByWorkRequest(workRequestId: string): Promise<any[]>;
    findRoomAndSolutions(workRequestId: string): Promise<any[]>;
    getRoomByRoomSolutionId(roomSolutionId: string): Promise<RoomEntity>;
}
