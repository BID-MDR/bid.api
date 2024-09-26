import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateTechnicalVisitDto } from '../dtos/technical-visit/create-technical-visit.dto';
import { UpdateTechnicalVisitDto } from '../dtos/technical-visit/update-technical-visit.dto';
import { TechnicalVisitEntity } from '../entitites/technical-visit.entity';
export declare class TechnicalVisitRepository extends BaseRepository<TechnicalVisitEntity, CreateTechnicalVisitDto, UpdateTechnicalVisitDto> {
    private repository;
    constructor(repository: Repository<TechnicalVisitEntity>);
    getByProfessional(professionalId: string): Promise<TechnicalVisitEntity[]>;
}
