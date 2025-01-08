import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InterventionEntity } from "../../entitites/Intervention.entity";
import { CreateInterventionRequestDto } from "../../dtos/intervention/intervention-request.dto";

@Injectable()
export class InterventionRepository extends BaseRepository<
  InterventionEntity,
  CreateInterventionRequestDto,
  CreateInterventionRequestDto
> {
  constructor(
    @InjectRepository(InterventionEntity)
    private repository: Repository<InterventionEntity>,
  ) {
    super(repository);
  }

}