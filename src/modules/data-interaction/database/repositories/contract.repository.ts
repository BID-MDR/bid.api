import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateContractDto } from '../dtos/contract/create-contract.dto';
import { UpdateContractDto } from '../dtos/contract/update-contract.dto';
import { ContractEntity } from '../entitites/contract.entity';

@Injectable()
export class ContractRepository extends BaseRepository<
    ContractEntity,
    CreateContractDto,
    UpdateContractDto
> {
    constructor(@InjectRepository(ContractEntity) private repository: Repository<ContractEntity>) {
        super(repository);
    }

    async findByUserId(userId: string): Promise<ContractEntity[]> {
        return await this.repository.createQueryBuilder('contract')
            .leftJoin('contract.costEstimationId', 'cost-estimation')
            .leftJoin('cost-estimation.workRequestId', 'work-request')
            .leftJoin('cost-estimation.professionalId', 'user')
            .where('work-request.beneficiaryId = :id', { userId })
            .getMany();
    }

    async findById(id: string): Promise<ContractEntity | undefined> {

        return await this.repository.createQueryBuilder('contract')
            .leftJoin('contract.costEstimationId', 'cost-estimation')
            .leftJoin('cost-estimation.workRequestId', 'work-request')
            .leftJoin('cost-estimation.professionalId', 'user')
            .where('cost-estimation.id = :id', { id })
            .getOne();
    }
}

