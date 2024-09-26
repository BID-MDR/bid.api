import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateRoomSolutionDto } from '../../dtos/room-solution/create-room-solution.dto';
import { RoomSolutionEntity } from '../../entitites/room-solution.entity';
export declare class RoomSolutionRepository extends BaseRepository<RoomSolutionEntity, CreateRoomSolutionDto, any> {
    private repository;
    constructor(repository: Repository<RoomSolutionEntity>);
    findAllRoomWithoutSolution(): Promise<any>;
    findAllRoomWithSolution(id: string): Promise<any>;
    updateRoomSolutions(roomSolutionUpdates: {
        id: string;
        data: CreateRoomSolutionDto;
    }[]): Promise<void>;
}
