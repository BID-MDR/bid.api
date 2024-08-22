import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateCostEstimationDto } from 'src/modules/data-interaction/database/dtos/cost-estimation/create-cost-estimation.dto';
import { UpdateCostEstimationDto } from 'src/modules/data-interaction/database/dtos/cost-estimation/update-cost-estimation.dto';
import { CostEstimationEntity } from 'src/modules/data-interaction/database/entitites/cost-estimation.entity';
import { CostEstimationRepository } from 'src/modules/data-interaction/database/repositories/cost-estimation.repository';
import { RoomSolutionRepository } from 'src/modules/data-interaction/database/repositories/room/room-solution.repository';
import { RoomRepository } from 'src/modules/data-interaction/database/repositories/room/room.repository';


@Injectable()
export class FeatureCostEstimationService extends BaseService<
    CostEstimationEntity,
    CreateCostEstimationDto,
    UpdateCostEstimationDto
> {
    constructor(
        private costEstimationRepository: CostEstimationRepository,
        private readonly userAppointmentRepository: UserAppointmentRepository,
        private RoomSolutionRepository: RoomSolutionRepository,
        private RoomRepository: RoomRepository,

    ) {
        super(costEstimationRepository);
    }

    async listByUserId(userId: string) {
        // Implement logic to fetch cost estimations by user ID
        return await this.costEstimationRepository.findByUserId(userId);
    }
    async findById(id: string) {
        // Implement logic to find cost estimation by ID
        return await this.costEstimationRepository.findById(id);
    }

    async create(costEstimation: CreateCostEstimationDto): Promise<CostEstimationEntity> {
        // Implement logic to create a new cost estimation
        return await super.create(costEstimation);
    }

    async update(id: string, costEstimation: UpdateCostEstimationDto): Promise<CostEstimationEntity> {
        // Implement logic to update an existing cost estimation
        // Here, you might want to add some checks to ensure that the user is authorized to update the cost estimation
        return await super.update(id, costEstimation);
    }
    async beneficiaryResponse(id:string, data: UpdateCostEstimationDto): Promise<CostEstimationEntity> {
        try {

            // Fetch the corresponding cost estimation
            const costEstimation = await this.costEstimationRepository.findById(id);
            if (!costEstimation) {
                throw new Error("Cost estimation not found");
            }

            // Save the updated cost estimation
            return await super.update(id,costEstimation);
        } catch (error) {
            throw new Error(`Failed to process beneficiary response: ${error.message}`);
        }
    }
    async profissionalResponseUpdateRooms(
        id: string,
        data: any,
    ): Promise<CostEstimationEntity> {
        try {
            // Fetch the corresponding cost estimation
            const costEstimation = await this.costEstimationRepository.findById(id);
            if (!costEstimation) {
                throw new Error('Cost estimation not found');
            }

            // Update fields in the cost estimation entity
            costEstimation.estimatedTimeToExecute = data.estimatedTimeToExecute;
            // Update other fields as needed

            // Save the updated cost estimation
            const updatedCostEstimation = await this.costEstimationRepository.update(id, costEstimation);

            // Iterate over each room in the data
            for (const roomData of data.rooms) {
                // Check if the room already exists
                let room = await this.RoomRepository.findById(roomData.id);
                // If the room doesn't exist, create it
                if (!room) {
                    room = await this.RoomRepository.create(roomData);
                }
                // Iterate over each room renovation in the room
                for (const roomRenovationData of roomData.roomRenovation) {
                    // Delete existing room renovations linked to this room and cost estimation
                    await this.RoomSolutionRepository.deleteByRoomAndCostEstimation(room.id, costEstimation.id);
                    // Create new room renovation
                    const newRoomRenovation = await this.RoomSolutionRepository.create({
                        ...roomRenovationData,
                        roomId: room.id,
                        costEstimationId: costEstimation.id,
                    });
                }
            }

            return updatedCostEstimation;
        } catch (error) {
            throw new Error(`Failed to process professional response: ${error.message}`);
        }
    }
}
