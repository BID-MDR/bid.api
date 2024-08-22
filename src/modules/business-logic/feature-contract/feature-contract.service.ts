import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateContractDto } from 'src/modules/data-interaction/database/dtos/contract/create-contract.dto';
import { UpdateContractDto } from 'src/modules/data-interaction/database/dtos/contract/update-contract.dto';
import { ContractEntity } from 'src/modules/data-interaction/database/entitites/contract.entity';
import { ContractRepository } from 'src/modules/data-interaction/database/repositories/contract.repository';
import { ContractStatusEnum } from 'src/modules/data-interaction/database/enums/contract-status.enum';
import { RoomSolutionRepository } from 'src/modules/data-interaction/database/repositories/room/room-solution.repository';

@Injectable()
export class FeatureContractService extends BaseService<
    ContractEntity,
    CreateContractDto,
    UpdateContractDto
> {
    constructor(
        private ContractRepository: ContractRepository,
        private RoomSolutionRepository: RoomSolutionRepository,

    ) {
        super(ContractRepository);
    }

    async listByUserId(userId: string) {
        // Implement logic to fetch cost estimations by user ID
        return await this.ContractRepository.findByUserId(userId);
    }
    async findById(id: string) {
        // Implement logic to find cost estimation by ID
        return await this.ContractRepository.findById(id);
    }

    async create(contract: CreateContractDto): Promise<ContractEntity> {
        // Implement logic to create a new cost estimation
        return await super.create(contract);
    }

    async update(id: string, contract: UpdateContractDto): Promise<ContractEntity> {
        // Implement logic to update an existing cost estimation
        // Here, you might want to add some checks to ensure that the user is authorized to update the cost estimation
        return await super.update(id, contract);
    }
    async approveBeneficiary(id: string, validityFrom: Date, validityTo: Date, status: ContractStatusEnum): Promise<ContractEntity> {
        // Retrieve the contract entity by its ID
        const contract = await this.ContractRepository.findById(id);

        if (!contract) {
            // Handle the case where the contract with the provided ID is not found
            throw new Error(`Contract with ID ${id} not found`);
        }

        const updateContractDto: UpdateContractDto = {
            validityFrom,
            validityTo,
            status
        };

        // Save the updated contract entity back to the repository
        return await super.update(id, updateContractDto);
    }
    async responeContractProfessional(id: string, data:any): Promise<ContractEntity> {
        // Retrieve the contract entity by its ID
        const contract = await this.ContractRepository.findById(id);

        if (!contract) {
            // Handle the case where the contract with the provided ID is not found
            throw new Error(`Contract with ID ${id} not found`);
        }
        // Update room solutions associated with the cost estimation
        await this.RoomSolutionRepository.updateRoomSolutions(data.roomSolutionUpdates);
        // Save the updated contract entity back to the repository
        return await this.ContractRepository.update(data.contract.id, data.contract);
    }
}
