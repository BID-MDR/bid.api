import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InterventionEntity } from "../../entitites/intervention.entity";
import { CreateInterventionRequestDto } from "../../dtos/intervention/intervention-request.dto";
import { SurveyEntity } from "../../entitites/survey.entity";
import { CreateProfessionalSurveyDto } from "../../dtos/professional-survey/create-professional-survey.dto";

@Injectable()
export class SurveyRepository extends BaseRepository<
  SurveyEntity,
  CreateProfessionalSurveyDto,
  CreateProfessionalSurveyDto
> {
  constructor(
    @InjectRepository(SurveyEntity)
    private repository: Repository<SurveyEntity>,
  ) {
    super(repository);
  }

  async getByProfessional(professionalId: string) {
    return this.repository.find({
      where: { professional: { id: professionalId } },
      relations: ['professional', 'beneficiary', 'workRequest'],
    });
  }

}