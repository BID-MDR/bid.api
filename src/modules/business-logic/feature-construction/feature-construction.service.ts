import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateConstructionDto } from 'src/modules/data-interaction/database/dtos/construction/create-construction.dto';
import { UpdateConstructionDto } from 'src/modules/data-interaction/database/dtos/construction/update-construction.dto';
import { ConstructionEntity } from 'src/modules/data-interaction/database/entitites/construction.entity';
import { ConstructionRepository } from 'src/modules/data-interaction/database/repositories/construction.repository';

import { CostEstimationRepository } from 'src/modules/data-interaction/database/repositories/cost-estimation.repository';

@Injectable()
export class FeatureConstructionService extends BaseService<
    ConstructionEntity,
    CreateConstructionDto,
    UpdateConstructionDto
> {
    constructor(
        private ConstructionRepository: ConstructionRepository,
    ) {
        super(ConstructionRepository);
    }

    async listByUserId(userId: string) {
        // Implement logic to fetch cost estimations by user ID
        return await this.ConstructionRepository.findByUserId(userId);
    }
    async findById(id: string) {
        // Implement logic to find cost estimation by ID
        return await this.ConstructionRepository.findById(id);
    }

    async create(construction: CreateConstructionDto): Promise<ConstructionEntity> {
        // Implement logic to create a new cost estimation
        return await super.create(construction);
    }

    async update(id: string, construction: UpdateConstructionDto): Promise<ConstructionEntity> {
        // Implement logic to update an existing cost estimation
        // Here, you might want to add some checks to ensure that the user is authorized to update the cost estimation
        return await super.update(id, construction);
    }
    async updateContractStatus(id: string, construction: UpdateConstructionDto): Promise<ConstructionEntity> {
        // Implement logic to update an existing cost estimation
        // Here, you might want to add some checks to ensure that the user is authorized to update the cost estimation
        return await super.update(id, construction);
    }

    async complete(id: string, construction: CreateConstructionDto): Promise<ConstructionEntity> {
        // Implement logic to create a new cost estimation
        return await super.update(id, construction);
    }
}
