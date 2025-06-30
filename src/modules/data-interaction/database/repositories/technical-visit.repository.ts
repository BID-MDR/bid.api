import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { In, Not, Repository } from 'typeorm';
import { CreateTechnicalVisitDto } from '../dtos/technical-visit/create-technical-visit.dto';
import { UpdateTechnicalVisitDto } from '../dtos/technical-visit/update-technical-visit.dto';
import { TechnicalVisitEntity } from '../entitites/technical-visit.entity';
import { TechnicalVisitTypeEnum } from '../enums/technical-visit-type.enum';

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

}
