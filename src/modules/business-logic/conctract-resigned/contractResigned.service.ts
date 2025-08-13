import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";
import { ContractResignedEntity } from "src/modules/data-interaction/database/entitites/contract-resigned.entity";
import { CreateContractResignedRequestDto } from "src/modules/data-interaction/database/dtos/contract-resigned/contract-resigned-request.dto";
import { ContractResignedRepository } from "src/modules/data-interaction/database/repositories/contract-resigned/contract-resigned.repository";
import { CreateContractResignedUpdateStatusRequestDto } from "src/modules/data-interaction/database/dtos/contract-resigned/contract-resigned-update-status-request.dto";
import { BidDocumentRepository } from "src/modules/data-interaction/database/repositories/bidDocument/bidDocument.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { ContractResignedStatusEnum } from "src/modules/data-interaction/database/enums/contract-resigned-stauts.enum";

@Injectable()
export class ContractResignedService extends BaseService<ContractResignedEntity, CreateContractResignedRequestDto, CreateContractResignedRequestDto> {
  constructor(
    private repository: ContractResignedRepository,
    private workRequestRepo: WorkRequestRepository,
    private userRepo: UserRepository,
    private bidDocumentRepo: BidDocumentRepository

  ) {
    super(repository);
  }

  async list() {
    return await this.repository.find();
  }

  async getById(workRequestId: string) {
    return await this.repository.findById(workRequestId);
  }


  async register(data: CreateContractResignedRequestDto) {
    const workRequest = await this.workRequestRepo.findById(data.workRequestId);
    if (!workRequest) throw new NotFoundException('WorkRequest not found!');
    data.workRequest = workRequest;
    const professional = await this.userRepo.findById(data.professionalId)
    if(!professional) throw new NotFoundException('Professional not found!')
    data.professional = professional
    // const bidDocument = await this.bidDocumentRepo.findById(data.bidDocumentId)
    // if(!bidDocument) throw new NotFoundException('Document not found!')
    // data.bidDocument = bidDocument

    return await this.repository.create(data);
  }

  async registerAndUpdateWorkRequest(data: CreateContractResignedRequestDto) {
    const workRequest = await this.workRequestRepo.findById(data.workRequestId);
    if (!workRequest) throw new NotFoundException('WorkRequest not found!');
    data.workRequest = workRequest;
    await this.workRequestRepo.changeContractStatus(workRequest.id)
    const professional = await this.userRepo.findById(data.professionalId)
    if(!professional) throw new NotFoundException('Professional not found!')
    data.professional = professional
    const bidDocument = await this.bidDocumentRepo.findById(data.bidDocumentId)
    if(!bidDocument) throw new NotFoundException('Document not found!')
    data.bidDocument = bidDocument
    data.status = ContractResignedStatusEnum.RESIGNED
    return await this.repository.create(data);
  }


 

  async update(costEstimateId: string, data: CreateContractResignedRequestDto) {
    if(data.workRequestId) {
      const workRequest = await this.workRequestRepo.findById(data.workRequestId);
      if (!workRequest) throw new NotFoundException('WorkRequest not found!');
      data.workRequest = workRequest;
      delete data.workRequestId
    }
    if(data.professionalId) {
      const professional = await this.userRepo.findById(data.professionalId)
      if(!professional) throw new NotFoundException('Professional not found!')
      data.professional = professional
      delete data.professionalId
    }
    if(data.bidDocumentId) {
      const bidDocument = await this.bidDocumentRepo.findById(data.bidDocumentId)
      if(!bidDocument) throw new NotFoundException('Document not found!')
      data.bidDocument = bidDocument
      delete data.bidDocumentId
    }
    return await super.update(costEstimateId, data);
  }



  async updateStatus(contractResignedId: string, data: CreateContractResignedUpdateStatusRequestDto) {
    const contractResigned = await this.repository.findById(contractResignedId)
    if (!contractResigned) throw new NotFoundException('Contract Resigned not found!')
    if (data.reason) {
      return await this.repository.updateContractResignedReason(contractResignedId, data)
    } else {
      return await this.repository.updateContractResignedStatus(contractResignedId, data)

    }
  }

  async declineContract(contractResignedId: string,) {
    const contractResigned = await this.repository.findById(contractResignedId)
    if(!contractResigned) throw new NotFoundException('Contract not found!')
    await this.workRequestRepo.changeContractStatus(contractResigned.workRequest.id)
    return  await this.repository.declineContract(contractResignedId)   
  }

  async delete(costEstimateId: string) {
    return await this.repository.hardDelete(costEstimateId);
  }

  async findContractByWorkRequest(workRequestId: string) {
    return await this.repository.getByWorkRequestId(workRequestId);
  }

}
