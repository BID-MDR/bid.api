import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";

import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { ImprovementProjectEntity } from "src/modules/data-interaction/database/entitites/improvement-project.entity";
import { ImprovementProjectRequestDto } from "src/modules/data-interaction/database/dtos/improvementProject/improvement-project-request.dto";
import { ImprovementProjectRepository } from "src/modules/data-interaction/database/repositories/improvement-project/improvement-project.repository";
import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";
import { BidDocumentRepository } from "src/modules/data-interaction/database/repositories/bidDocument/bidDocument.repository";
import { ImprovementProjectAddDocumentRequestDto } from "src/modules/data-interaction/database/dtos/improvementProject/improvement-project-add-document-request.dto";
import { ImprovementProjectUpdateStatusRequestDto } from "src/modules/data-interaction/database/dtos/improvementProject/improvement-project-update-status-request.dto";

@Injectable()
export class ImpromentProjectService extends BaseService<ImprovementProjectEntity, ImprovementProjectRequestDto, ImprovementProjectRequestDto> {
  constructor(
    private improvementProjectRepository: ImprovementProjectRepository,
     private userRepository: UserRepository,
     private workRequestRepo: WorkRequestRepository,
     private bidDocumentRepo: BidDocumentRepository
  ) {
    super(improvementProjectRepository);
  }

  async list() {
    return await this.improvementProjectRepository.findAll();
  }

  async getById(workRequestId: string) {
    return await this.improvementProjectRepository.findById(workRequestId);
  }



  async register(data: ImprovementProjectRequestDto) {
   const workRequest = await this.workRequestRepo.findById(data.workRequestId)
   data.workRequest = workRequest
   if (!workRequest) throw new NotFoundException('Work request not found')
  if (data.documentId || data.documentId !== ''){
    const document = await this.bidDocumentRepo.findById(data.documentId)
    if(!document) throw new NotFoundException('Document not found!')
    data.document = document
  }
  const professional  = await this.userRepository.findById(data.professionalId)
  if (!professional) throw new NotFoundException('Professional not found!')
  data.professional = professional
  return await this.improvementProjectRepository.create(data)
  }

  async addDocument(projectId: string,data: ImprovementProjectAddDocumentRequestDto) {
    const project = await this.improvementProjectRepository.findById(projectId)
    if(!project) throw new NotFoundException('Project not found!')
     const document = await this.bidDocumentRepo.findById(data.documentId)
     if(!document) throw new NotFoundException('Document not found!')
     data.document = document
    return await this.improvementProjectRepository.addDocument(projectId, data.document)
   }

   async updateProjectStatus(projectId: string,data: ImprovementProjectUpdateStatusRequestDto) {
    const project = await this.improvementProjectRepository.findById(projectId)
    if(!project) throw new NotFoundException('Project not found!')
    return await this.improvementProjectRepository.updateStatus(projectId, data)
   }



  async delete(workRequestId: string) {
    return await this.improvementProjectRepository.hardDelete(workRequestId);
  }

 



}
