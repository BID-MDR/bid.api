import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateRenovationProjectDto } from '../dtos/renovation-project/create-renovation-project.dto';
import { UpdateRenovationProjectDto } from '../dtos/renovation-project/update-renovation-project.dto';
import { RenovationProjectEntity } from '../entitites/renovation-project.entity';

@Injectable()
export class RenovationProjectRepository extends BaseRepository<RenovationProjectEntity,CreateRenovationProjectDto,UpdateRenovationProjectDto> {

    constructor(@InjectRepository(RenovationProjectEntity) private repository: Repository<RenovationProjectEntity>) {
        super(repository);
    }

    async findByUserId(userId: string): Promise<RenovationProjectEntity[]> {
        return await this.repository.createQueryBuilder('renovation-project')
            .leftJoin('renovation-project.contractId', 'contract')
            .leftJoin('contract.costEstimationId', 'cost-estimation')
            .leftJoin('contract.workRequestId', 'work-request')
            .leftJoin('work-request.beneficiaryId', 'user')
            .leftJoin('user.addressId', 'address')
            .where('work-request.beneficiaryId = :id', { userId })
            .getMany();
    }

    async findById(id: string): Promise<RenovationProjectEntity | undefined> {

        return await this.repository.createQueryBuilder('renovation-project')
            .leftJoin('renovation-project.contractId', 'contract')
            .leftJoin('contract.costEstimationId', 'cost-estimation')
            .leftJoin('contract.workRequestId', 'work-request')
            .leftJoin('work-request.beneficiaryId', 'user')
            .leftJoin('user.addressId', 'address')
            .where('renovation-project.id = :id', { id })
            .getOne();
    }
}

