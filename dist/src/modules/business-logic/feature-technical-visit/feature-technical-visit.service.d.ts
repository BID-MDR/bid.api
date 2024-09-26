import { BaseService } from 'src/core/services/base.service';
import { CreateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit.dto';
import { UpdateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/update-technical-visit.dto';
import { TechnicalVisitEntity } from 'src/modules/data-interaction/database/entitites/technical-visit.entity';
import { TechnicalVisitRepository } from 'src/modules/data-interaction/database/repositories/technical-visit.repository';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
export declare class FeatureTechnicalVisitService extends BaseService<TechnicalVisitEntity, CreateTechnicalVisitDto, UpdateTechnicalVisitDto> {
    private technicalVisitRepository;
    private readonly userRepository;
    constructor(technicalVisitRepository: TechnicalVisitRepository, userRepository: UserRepository);
    getByProfessional(professionalId: string): Promise<TechnicalVisitEntity[]>;
    schedule(dto: CreateTechnicalVisitDto): Promise<TechnicalVisitEntity>;
}
