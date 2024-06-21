import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateCostEstimationDto } from '../dtos/cost-estimation/create-cost-estimation.dto';
import { UpdateCostEstimationDto } from '../dtos/cost-estimation/update-cost-estimation.dto';
import { CostEstimationEntity } from '../entitites/cost-estimation.entity';

@Injectable()
export class CostEstimationRepository extends BaseRepository<CostEstimationEntity,CreateCostEstimationDto,UpdateCostEstimationDto> {

    constructor(@InjectRepository(CostEstimationEntity) private repository: Repository<CostEstimationEntity>) {
        super(repository);
    }

    async findByUserId(userId: string): Promise<CostEstimationEntity[]> {
        return await this.repository.createQueryBuilder('cost-estimation')
            .leftJoin('cost-estimation.workRequestId', 'work-request')
            .leftJoin('cost-estimation.professionalId', 'user')
            .where('work-request.beneficiaryId = :id', { userId })
            .getMany();
    }

    async findById(id: string): Promise<CostEstimationEntity | undefined> {

        return await this.repository.createQueryBuilder('cost-estimation')
            .leftJoin('cost-estimation.workRequestId', 'work-request')
            .leftJoin('cost-estimation.professionalId', 'user')
            .where('cost-estimation.id = :id', { id })
            .getOne();
    }
}

