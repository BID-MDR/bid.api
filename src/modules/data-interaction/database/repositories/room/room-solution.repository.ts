import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateRoomSolutionDto } from '../../dtos/room-solution/create-room-solution.dto';
import { RoomSolutionEntity } from '../../entitites/room-solution.entity';

@Injectable()
export class RoomSolutionRepository extends BaseRepository<RoomSolutionEntity, CreateRoomSolutionDto, any> {
    constructor(@InjectRepository(RoomSolutionEntity) private repository: Repository<RoomSolutionEntity>) {
        super(repository);
    }


    async findAllRoomWithoutSolution(){
       return await this.repository.query(`SELECT r.* FROM room r LEFT JOIN room_solution rs ON r.id = rs.roomId WHERE rs.roomId IS NULL;`);
    }

    async updateRoomSolutions(roomSolutionUpdates: { id: string, data: CreateRoomSolutionDto }[]): Promise<void> {
        for (const update of roomSolutionUpdates) {
            const { id, data } = update;
            const roomSolution = await this.repository.findOne({ where: { id } });

            if (roomSolution) {

                roomSolution.solution = data.solution;
                // Update other fields as needed

                await this.repository.save(roomSolution);
            } else {
                throw new Error(`Room solution with ID ${id} not found.`);
            }
        }
    }
}
