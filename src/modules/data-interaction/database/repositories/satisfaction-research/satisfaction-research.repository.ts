import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionResearchEntity } from "../../entitites/satisfaction-research.entity";
import { BaseRepository } from "src/core/repositories/base.repository";
import { CreateSatisfactionResearchDto } from "../../dtos/satisfaction-research/create-satisfaction-research.dto";

@Injectable()
export class SatisfactionResearchRepository extends BaseRepository<SatisfactionResearchEntity, CreateSatisfactionResearchDto, CreateSatisfactionResearchDto> {
  constructor(@InjectRepository(SatisfactionResearchEntity) private repository: Repository<SatisfactionResearchEntity>) {
    super(repository);
  }
}
