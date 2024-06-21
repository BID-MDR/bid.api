import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateConstructionDto } from '../dtos/construction/create-construction.dto';
import { UpdateConstructionDto } from '../dtos/construction/update-construction.dto';
import { ConstructionEntity } from '../entitites/construction.entity';

@Injectable()
export class ConstructionRepository extends BaseRepository<
    ConstructionEntity,
    CreateConstructionDto,
    UpdateConstructionDto
> {
    constructor(@InjectRepository(ConstructionEntity) private repository: Repository<ConstructionEntity>) {
        super(repository);
    }

    async findByUserId(userId: string): Promise<ConstructionEntity[]> {
        return await this.repository.createQueryBuilder('construction')
            .leftJoin('construction.renovationProjectId', 'renovation-project')
            .leftJoin('construction.id', 'room-solution')
            .leftJoin('room-solution.id', 'construction-room-media')
            .leftJoin('renovation-project.contractId', 'contract')
            .leftJoin('contract.costEstimationId', 'cost-estimation')
            .leftJoin('contract.workRequestId', 'work-request')
            .leftJoin('work-request.beneficiaryId', 'user')
            .leftJoin('user.addressId', 'address')
            .where('work-request.beneficiaryId = :id', { userId })
            .getMany();
    }

    async findById(id: string): Promise<ConstructionEntity | undefined> {

        return await this.repository.createQueryBuilder('construction')
            .leftJoin('construction.renovationProjectId', 'renovation-project')
            .leftJoin('construction.id', 'room-solution')
            .leftJoin('room-solution.id', 'construction-room-media')
            .leftJoin('renovation-project.contractId', 'contract')
            .leftJoin('contract.costEstimationId', 'cost-estimation')
            .leftJoin('contract.workRequestId', 'work-request')
            .leftJoin('work-request.beneficiaryId', 'user')
            .leftJoin('user.addressId', 'address')
            .where('construction.id = :id', { id })
            .getOne();
    }
}

