import { BaseService } from 'src/core/services/base.service';
import { CreateRoomDto } from 'src/modules/data-interaction/database/dtos/room/create-room.dto';
import { UpdateRoomDto } from 'src/modules/data-interaction/database/dtos/room/update-room.dto';
import { RoomEntity } from 'src/modules/data-interaction/database/entitites/room.entity';
import { RoomRepository } from 'src/modules/data-interaction/database/repositories/room/room.repository';
import { RoomSolutionRepository } from 'src/modules/data-interaction/database/repositories/room/room-solution.repository';
import { CreateRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/create-room-solution.dto';
import { RoomSolutionEntity } from 'src/modules/data-interaction/database/entitites/room-solution.entity';
import { RequestRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/request.dto';
import { WorkRequestRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request.repository';
export declare class FeatureRoomService extends BaseService<RoomEntity, CreateRoomDto, UpdateRoomDto> {
    private roomRepository;
    private roomSolutionRepository;
    private workRequestRepository;
    constructor(roomRepository: RoomRepository, roomSolutionRepository: RoomSolutionRepository, workRequestRepository: WorkRequestRepository);
    findById(id: string): Promise<RoomEntity>;
    create(room: CreateRoomDto): Promise<RoomEntity>;
    update(id: string, room: UpdateRoomDto): Promise<RoomEntity>;
    createRoomSolution(data: CreateRoomSolutionDto): Promise<RoomSolutionEntity>;
    selectAll(): Promise<any>;
    selectAllWithIntervention(id: string): Promise<any>;
    selectAllByWorkRequest(id: string): Promise<any[]>;
    selectInterventions(id: string): Promise<any[]>;
    register(body: RequestRoomSolutionDto): Promise<void>;
    getRoomByRoomSolutionId(roomSolutionId: string): Promise<RoomEntity>;
}
