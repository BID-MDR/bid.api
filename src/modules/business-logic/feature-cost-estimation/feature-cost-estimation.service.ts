import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateCostEstimationDto } from 'src/modules/data-interaction/database/dtos/cost-estimation/create-cost-estimation.dto';
import { UpdateCostEstimationDto } from 'src/modules/data-interaction/database/dtos/cost-estimation/update-cost-estimation.dto';
import { CostEstimationEntity } from 'src/modules/data-interaction/database/entitites/cost-estimation.entity';
import { CostEstimationRepository } from 'src/modules/data-interaction/database/repositories/cost-estimation.repository';

@Injectable()
export class FeatureCostEstimationService extends BaseService<
    CostEstimationEntity,
    CreateCostEstimationDto,
    UpdateCostEstimationDto
> {
    constructor(
        private costEstimationRepository: CostEstimationRepository,
        private readonly userAppointmentRepository: UserAppointmentRepository,
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
}
