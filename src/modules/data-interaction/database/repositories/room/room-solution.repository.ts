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
    async updateRoomSolutions(roomSolutionUpdates: { id: string, data: CreateRoomSolutionDto }[]): Promise<void> {
        for (const update of roomSolutionUpdates) {
            const { id, data } = update;
            const roomSolution = await this.repository.findOne({ where: { id } });

            if (roomSolution) {
                // Update the existing room solution with the provided data
                roomSolution.cost = data.cost;
                roomSolution.solution = data.solution;
                // Update other fields as needed

                await this.repository.save(roomSolution);
            } else {
                throw new Error(`Room solution with ID ${id} not found.`);
            }
        }
    }
    async deleteByRoomAndCostEstimation(roomId: string, costEstimationId: string): Promise<void> {
        await this.repository.createQueryBuilder('room-solution')
            .delete()
            .where("roomId = :roomId", { roomId })
            .andWhere("costEstimationId = :costEstimationId", { costEstimationId })
            .execute();
    }
}
