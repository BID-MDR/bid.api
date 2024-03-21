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
        return await this.userAppointmentRepository.listByUserId(userId);
    }
}
