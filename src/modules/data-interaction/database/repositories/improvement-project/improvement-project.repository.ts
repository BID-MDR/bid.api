import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";
import { ImprovementProjectEntity } from "../../entitites/improvement-project.entity";
import { ImprovementProjectRequestDto } from "../../dtos/improvementProject/improvement-project-request.dto";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { ImprovementProjectUpdateStatusRequestDto } from "../../dtos/improvementProject/improvement-project-update-status-request.dto";
import { ImprovementProjectStatusEnum } from "../../enums/improvement-project-status.enum";

@Injectable()
export class ImprovementProjectRepository extends BaseRepository<
  ImprovementProjectEntity,
  ImprovementProjectRequestDto,
  ImprovementProjectRequestDto
> {
  constructor(
    @InjectRepository(ImprovementProjectEntity)
    private repository: Repository<ImprovementProjectEntity>,
  ) {
    super(repository);
  }

async findById(costEstimateId: string): Promise<ImprovementProjectEntity> {
//  const meta = this.repository.metadata;
  const relations: string[] = ['professional', 'workRequest', 'workRequest.beneficiary', 'workRequest.beneficiary.address'];

  // if (meta.findRelationWithPropertyPath('workRequest')) {
  //   relations.push('workRequest');
  //   if (meta.findRelationWithPropertyPath('workRequest.room')) {
  //     relations.push('workRequest.room');
  //   }
  //      if (meta.findRelationWithPropertyPath('workRequest.beneficiary')) {
  //     relations.push('workRequest.beneficiary');
  //   }
  // }

  return this.repository.findOne({
    where: { id: costEstimateId },
    relations,      
  });
}
  async find(): Promise<ImprovementProjectEntity[]> {
    return await this.repository.find({
      //relations: ['workRequest', 'workRequest.room'],
    });
  }

  async addDocument(projectId: string, newDocument: BidDocumentEntity){
    return await this.repository.update({id: projectId}, {document: newDocument})
  }

  async getByProfessionalAndStatus(professionalId: string) {
    return this.repository.find({
      where: {
        professional: { id: professionalId },
        status: Not(In(['DELIVERED'])),
      },
        relations: ['professional', 'workRequest', 'workRequest.beneficiary'],
      });
  }
  async getByProfessional(professionalId: string) {
    return this.repository.find({
      where: {
        professional: { id: professionalId },
      },
        relations: ['workRequest', 'workRequest.technicalVisit' ,'workRequest.beneficiary', 'workRequest.beneficiary.address', 'workRequest.technicalVisit'],
        
      });
  }  

  async listByBeneficiary(beneficiaryId: string): Promise<ImprovementProjectEntity[]> {
    return this.repository.find({
      where: {
        workRequest: {
          beneficiary: { id: beneficiaryId }, 
        },
      },
      relations: ['workRequest', 'workRequest.beneficiary', 'workRequest.technicalVisit' ,'document', 'professional'],
    });
  }

  async findWorkRequest(workRequestId: string): Promise<any> {
    return await this.repository.createQueryBuilder("improvement_project")
      .leftJoinAndSelect("improvement_project.workRequest", "workRequest")
      .where("workRequest.id = :id", { id: workRequestId })
      .getOne();
  }
  async updateStatusProjectDelivery(projectId: string){
    return await this.repository.update({id: projectId}, {status: ImprovementProjectStatusEnum.PROJECT_DELIVERY})
  }
    async getByWorkRequest(wkRequestId: string): Promise<ImprovementProjectEntity[]> {
    return this.repository.find({
      where: {
        workRequest: { id: wkRequestId }
      },
      relations: ['workRequest', 'workRequest.beneficiary', 'workRequest.technicalVisit' ,'document', 'professional'],
    });
  }

  async updateStatus(projectId: string, data: ImprovementProjectUpdateStatusRequestDto){
    return await this.repository.update({id: projectId}, {status: data.status})
  }


}