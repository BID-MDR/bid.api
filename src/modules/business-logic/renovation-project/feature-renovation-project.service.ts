import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateRenovationProjectDto } from 'src/modules/data-interaction/database/dtos/renovation-project/create-renovation-project.dto';
import { UpdateRenovationProjectDto } from 'src/modules/data-interaction/database/dtos/renovation-project/update-renovation-project.dto';
import { RenovationProjectEntity } from 'src/modules/data-interaction/database/entitites/renovation-project.entity';
import { RenovationProjectRepository } from 'src/modules/data-interaction/database/repositories/renovation-project.repository';
import { StorageFacade } from 'src/modules/data-interaction/facade/apis/storage/storage.facade';

@Injectable()
export class FeatureRenovationProjectService extends BaseService<
    RenovationProjectEntity,
    CreateRenovationProjectDto,
    UpdateRenovationProjectDto
> {
    ContractRepository: any;
    RoomSolutionRepository: any;
    constructor(
        private RenovationProjectRepository: RenovationProjectRepository,
        private readonly userAppointmentRepository: UserAppointmentRepository,
        private readonly storageFacade: StorageFacade,

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
    async updateDocument(RenovationProject: CreateRenovationProjectDto): Promise<RenovationProjectEntity> {
        // Implement logic to create a new cost estimation
        if (RenovationProject.documentUrl && typeof RenovationProject.documentUrl === 'object') {
            const documentUrlObject = RenovationProject.documentUrl as { mimeType: string, fileName: string, data: any }; // Assuming mimeType is a string and data can be of any type
            RenovationProject.documentUrl = await this.storageFacade.uploadMedia(
                documentUrlObject.mimeType,
                documentUrlObject.fileName,
                documentUrlObject.data,
            );
        }

        return await this.RenovationProjectRepository.update(RenovationProject.contractId,RenovationProject);
    }

    async update(id: string, RenovationProject: UpdateRenovationProjectDto): Promise<RenovationProjectEntity> {
        // Implement logic to update an existing cost estimation
        // Here, you might want to add some checks to ensure that the user is authorized to update the cost estimation
        return await super.update(id, RenovationProject);
    }
    async terminateContract(id: string,RenovationProject: CreateRenovationProjectDto){
            // Retrieve the contract entity by its ID
            const contract = await this.ContractRepository.findById(id);

            const renovationProject = await this.RenovationProjectRepository.findByContractId(contract.id);

            if (!contract) {
                // Handle the case where the contract with the provided ID is not found
                throw new Error(`Contract with ID ${id} not found`);
            }

            // Update room solutions associated with the cost estimation
            await this.RenovationProjectRepository.hardDelete(RenovationProject.contractId);
            // Save the updated contract entity back to the repository
            return await this.ContractRepository.update(RenovationProject.contractId, RenovationProject);
    }
}
