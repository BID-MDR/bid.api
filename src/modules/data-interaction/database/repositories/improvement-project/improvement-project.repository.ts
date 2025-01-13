import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImprovementProjectEntity } from "../../entitites/improvement-project.entity";
import { ImprovementProjectRequestDto } from "../../dtos/improvementProject/improvement-project-request.dto";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { ImprovementProjectUpdateStatusRequestDto } from "../../dtos/improvementProject/improvement-project-update-status-request.dto";

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
    return await this.repository.findOne({
      where: { id: costEstimateId },
   //   relations: [ 'workRequest', 'workRequest.room'],
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

  async updateStatus(projectId: string, data: ImprovementProjectUpdateStatusRequestDto){
    return await this.repository.update({id: projectId}, {status: data.status})
  }


}