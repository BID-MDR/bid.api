import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateCostEstimationDto } from '../dtos/cost-estimation/create-cost-estimation.dto';
import { UpdateCostEstimationDto } from '../dtos/cost-estimation/update-cost-estimation.dto';
import { CostEstimationEntity } from '../entitites/cost-estimation.entity';

@Injectable()
export class CostEstimationRepository extends BaseRepository<
    CostEstimationEntity,
    CreateCostEstimationDto,
    UpdateCostEstimationDto
> {
    constructor(@InjectRepository(CostEstimationEntity) private repository: Repository<CostEstimationEntity>) {
        super(repository);
    }
}
