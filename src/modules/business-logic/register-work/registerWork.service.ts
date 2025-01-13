import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { CreateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/create-work-request.dto";
import { CreateInterventionRequestDto } from "src/modules/data-interaction/database/dtos/intervention/intervention-request.dto";
import { RoomRepository } from "src/modules/data-interaction/database/repositories/room/room.repository";
import { RegisterWorkEntity } from "src/modules/data-interaction/database/entitites/register-work.entity";
import { RegisterWorkRepository } from "src/modules/data-interaction/database/repositories/registerWork/registerWork.repository";
import { RegisterWorkCreateDto } from "src/modules/data-interaction/database/dtos/register-work/register-work.dto";
import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";
import { BidDocumentRepository } from "src/modules/data-interaction/database/repositories/bidDocument/bidDocument.repository";
import { UserProfessionalInfoRepository } from "src/modules/data-interaction/database/repositories/user/user-professional-info.repository";

@Injectable()
export class RegisterWorkService extends BaseService<RegisterWorkEntity, RegisterWorkCreateDto, RegisterWorkCreateDto> {
  constructor(
    private repository: RegisterWorkRepository,
    private workRequestRepo: WorkRequestRepository,
    private bidDocumentRepo: BidDocumentRepository,
    private professionalRepo: UserProfessionalInfoRepository
  ) {
    super(repository);
  }

  async list() {
    const list =  await this.repository.findAll();
    return list
  }

  async getById(workRequestId: string) {
    return await this.repository.findById(workRequestId);
  }


  async register(data: RegisterWorkCreateDto) {
    const workRequest = await this.workRequestRepo.findById(data.workRequestId)
    if (!workRequest) throw new NotFoundException('WorkRequest not found!')
    data.workRequest = workRequest
    const bidDocument = await this.bidDocumentRepo.findById(data.bidDocumentId)
    if (!bidDocument) throw new NotFoundException('WorkRequest not found!')
    data.bidDocument = bidDocument
    const professional = await this.professionalRepo.findById(data.professionalId)
    if (!professional) throw new NotFoundException('Professional not found!')
    data.professional = professional
    return await this.repository.create(data)
  }

 

  async update(interventionId: string, data: RegisterWorkCreateDto) {
    return await super.update(interventionId, data);
  }

  async startWork(registerWorkId: string ) {
    const registerWork = await this.repository.findById(registerWorkId)
    if(!registerWork) throw new NotFoundException('RegisterWork not found')
    return await this.repository.startRegisterWork(registerWorkId);
  }

  async endRegisterWork(registerWorkId: string ) {
    const registerWork = await this.repository.findById(registerWorkId)
    if(!registerWork) throw new NotFoundException('RegisterWork not found')
    return await this.repository.endRegisterWork(registerWorkId);
  }



  async delete(interventionId: string) {
    return await this.repository.hardDelete(interventionId);
  }


}
