import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CostEstimateEntity } from "../../entitites/cost-estimate.entity";
import { CreateCostEstimateRequestDto } from "../../dtos/cost-estimate/cost-estimate-request.dto";

@Injectable()
export class CostEstimateRepository extends BaseRepository<
  CostEstimateEntity,
  CreateCostEstimateRequestDto,
  CreateCostEstimateRequestDto
> {
  constructor(
    @InjectRepository(CostEstimateEntity)
    private repository: Repository<CostEstimateEntity>,
  ) {
    super(repository);
  }

}