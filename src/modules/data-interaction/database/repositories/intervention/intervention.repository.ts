import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { CreateInterventionRequestDto } from "../../dtos/intervention/intervention-request.dto";
import { InterventionEntity } from "../../entitites/intervention.entity";

@Injectable()
export class InterventionRepository extends BaseRepository<
  InterventionEntity,
  CreateInterventionRequestDto,
  CreateInterventionRequestDto
> {
  constructor(
    @InjectRepository(InterventionEntity)
    private ormRepo: Repository<InterventionEntity>
  ) {
    super(ormRepo);
  }

  async find(options?: {
    where?: FindOptionsWhere<InterventionEntity> | FindOptionsWhere<InterventionEntity>[];
    relations?: string[];
  }): Promise<InterventionEntity[]> {
    return this.ormRepo.find(options);
  }

  async findAll(): Promise<InterventionEntity[]> {
    return this.ormRepo.find();
  }

  async findById(id: string): Promise<InterventionEntity | null> {
    return this.ormRepo.findOne({
      where: { id },
      relations: ["room"],
    });
  }
}
