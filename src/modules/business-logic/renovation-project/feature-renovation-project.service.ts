import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateRenovationProjectDto } from 'src/modules/data-interaction/database/dtos/renovation-project/create-renovation-project.dto';
import { UpdateRenovationProjectDto } from 'src/modules/data-interaction/database/dtos/renovation-project/update-renovation-project.dto';
import { RenovationProjectEntity } from 'src/modules/data-interaction/database/entitites/renovation-project.entity';
import { RenovationProjectRepository } from 'src/modules/data-interaction/database/repositories/renovation-project.repository';

@Injectable()
export class FeatureRenovationProjectService extends BaseService<
    RenovationProjectEntity,
    CreateRenovationProjectDto,
    UpdateRenovationProjectDto
> {
    constructor(
        private RenovationProjectRepository: RenovationProjectRepository,
        private readonly userAppointmentRepository: UserAppointmentRepository,
    ) {
        super(RenovationProjectRepository);
    }

    async listByUserId(userId: string) {
        // Implement logic to fetch cost estimations by user ID
        return await this.RenovationProjectRepository.findByUserId(userId);
    }
    async findById(id: string) {
        // Implement logic to find cost estimation by ID
        return await this.RenovationProjectRepository.findById(id);
    }

    async create(RenovationProject: CreateRenovationProjectDto): Promise<RenovationProjectEntity> {
        // Implement logic to create a new cost estimation
        return await super.create(RenovationProject);
    }

    async update(id: string, RenovationProject: UpdateRenovationProjectDto): Promise<RenovationProjectEntity> {
        // Implement logic to update an existing cost estimation
        // Here, you might want to add some checks to ensure that the user is authorized to update the cost estimation
        return await super.update(id, RenovationProject);
    }
}
