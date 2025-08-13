import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { In, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { CreateTechnicalVisitDto } from '../dtos/technical-visit/create-technical-visit.dto';
import { UpdateTechnicalVisitDto } from '../dtos/technical-visit/update-technical-visit.dto';
import { TechnicalVisitEntity } from '../entitites/technical-visit.entity';
import { TechnicalVisitTypeEnum } from '../enums/technical-visit-type.enum';
import { TechnicalVisitStatusEnum } from '../enums/technical-visit-status.enum';

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
        const relations = [
            'professional',
            'beneficiary',
            'userCreate',
            'demand',
            'workRequest',
            'contract',
            'improvementProject',
            'registerWorkBeginning',
            'registerWorkClosure',
            'survey',
        ];
        const result = await this.repository.find({
            where: { professional: { id: professionalId } },
            relations: relations,
        });
        return result;
    }

    async getById(id: string) {
        const relations = [
            'professional',
            'beneficiary',
            'beneficiary.address',
            'demand',
            'workRequest',
            'workRequest.welfare',
            'workRequest.improvementRoom',
            'workRequest.room',
            'contract',
            'improvementProject',
            'registerWorkBeginning',
            'registerWorkClosure',
            'survey',
        ];
        const result = await this.repository.findOne({
            where: { id: id },
            relations: relations,
        });
        return result;
    }
    
    async getByProfessionalVisitaTecnicaAgendada(professionalId: string) {
        const relations = [
            'professional',
            'beneficiary',
            'beneficiary.address',
            'demand',
            'workRequest',
            'workRequest.welfare',
            'contract',
            'improvementProject',
            'registerWorkBeginning',
            'registerWorkClosure',
            'survey',
        ];
        const result = await this.repository.find({
            where: { professional: { id: professionalId },
            type: TechnicalVisitTypeEnum.VISITA_TECNICA, 
            status: In(['AGENDADA', 'REAGENDADA', 'REALIZADA', 'CANCELADA']),},
            relations: relations,
        });
        return result;
    }
    
    async getByProfessionalPendent(professionalId: string) {
        const relations = [
            'professional',
            'beneficiary',
            'demand',
            'workRequest',
            'contract',
            'improvementProject',
            'registerWorkBeginning',
            'registerWorkClosure',
            'survey',
        ];
        const result = await this.repository.find({
            where: { professional: { id: professionalId },
            status: In(['PENDENTE', 'CANCELADA'])},
            relations: relations,
        });
        
        return result;
    }
    async getByProfessionalAndDateVisitaTecnicaAgendada(
  professionalId: string,
  from: Date,
  to: Date
): Promise<TechnicalVisitEntity[]> {
     return this.repository.createQueryBuilder('tv')
    .leftJoinAndSelect('tv.professional', 'prof')
    .leftJoinAndSelect('tv.beneficiary', 'ben')
    .where('prof.id = :professionalId', { professionalId: professionalId})
    .andWhere('tv.type = :type', { type: TechnicalVisitTypeEnum.VISITA_TECNICA })
    .andWhere('tv.status IN (:...status)', {
      status: [
        TechnicalVisitStatusEnum.AGENDADA,
        TechnicalVisitStatusEnum.REAGENDADA,
        TechnicalVisitStatusEnum.REALIZADA,
        TechnicalVisitStatusEnum.CANCELADA,
      ],
    })
    .andWhere('tv.from <= :to', { to })
    .andWhere('tv.to >= :from', { from })
    .getMany();
  
}

    async getByBeneficiary(beneficiaryId: string){
          
        const relations = [
            'professional',
            'beneficiary',
            'userCreate',
            'workRequest',
        ];
    
        const result = await this.repository.find({
            where: { beneficiary: { id: beneficiaryId } },
            relations: relations,
        });
        return result;
    }

    async getByProfessionalAndStatus(professionalId: string) {
      return this.repository.find({
        where: {
          professional: { id: professionalId },
          status: Not(In(['REALIZADA', 'CANCELADA', 'SOLICITACAO_CANCELADA', 'VISITA_CANCELADA'])),
        },
        relations: ['professional', 'beneficiary', 'workRequest', 'workRequest.beneficiary'],
      });
    }
    async updateStatusToFinishById(
  id: string,
) {
  return this.repository.update({ id }, { status: TechnicalVisitStatusEnum.REALIZADA });
}




}
