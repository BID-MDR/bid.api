import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateTechnicalVisitDto } from '../dtos/technical-visit/create-technical-visit.dto';
import { UpdateTechnicalVisitDto } from '../dtos/technical-visit/update-technical-visit.dto';
import { TechnicalVisitEntity } from '../entitites/technical-visit.entity';

@Injectable()
export class TechnicalVisitRepository extends BaseRepository<
    TechnicalVisitEntity,
    CreateTechnicalVisitDto,
    UpdateTechnicalVisitDto
> {
    constructor(@InjectRepository(TechnicalVisitEntity) private repository: Repository<TechnicalVisitEntity>) {
        super(repository);
    }

    async getByProfessional(professionalId: string) {
        return this.repository.find({
            where: { professional: { id: professionalId } },
            relations: ['professional', 'beneficiary', 'workRequest'],
        });
    }
}
