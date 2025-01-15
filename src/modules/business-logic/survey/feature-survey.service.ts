import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateProfessionalSurveyDto } from 'src/modules/data-interaction/database/dtos/professional-survey/create-professional-survey.dto';
import { CreateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit.dto';
import { SurveyEntity } from 'src/modules/data-interaction/database/entitites/survey.entity';
import { TechnicalVisitRegisterWorkEnum } from 'src/modules/data-interaction/database/enums/technical-visit-register-work-type.enum';
import { SurveyRepository } from 'src/modules/data-interaction/database/repositories/survey/survey.repository';
import { TechnicalVisitRepository } from 'src/modules/data-interaction/database/repositories/technical-visit.repository';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { WorkRequestRepository } from 'src/modules/data-interaction/database/repositories/work-request/work-request.repository';

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
