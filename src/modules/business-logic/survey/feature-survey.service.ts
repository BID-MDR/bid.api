import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateProfessionalSurveyDto } from 'src/modules/data-interaction/database/dtos/professional-survey/create-professional-survey.dto';
import { SurveyEntity } from 'src/modules/data-interaction/database/entitites/survey.entity';
import { SurveyRepository } from 'src/modules/data-interaction/database/repositories/survey/survey.repository';
@Injectable()
export class FeatureSurveyService extends BaseService<
    SurveyEntity,
    CreateProfessionalSurveyDto,
    CreateProfessionalSurveyDto
> {
    constructor(
        private surveyRepository: SurveyRepository
    ) {
        super(surveyRepository);
    }

    async getByProfessional(professionalId: string) {
        return await this.surveyRepository.getByProfessional(professionalId);
    }
}
