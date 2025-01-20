import {  Injectable, NotFoundException } from "@nestjs/common";

import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";

import { ContractRepository } from "../data-interaction/database/repositories/contract/contract.repository";
import { BaseService } from "src/core/services/base.service";
import { ContractEntity } from "../data-interaction/database/entitites/contract.entity";
import { CreateContractRequestDto } from "../data-interaction/database/dtos/contract/contract-request.dto";
import { ContractUpdateStatusDto } from "../data-interaction/database/dtos/contract/contract-update-status.dto";
import { ContractCancelDto } from "../data-interaction/database/dtos/contract/contract-cancel.dto";
import { ContractStatusEnum } from "../data-interaction/database/enums/contract-status.enum";
import { UserRepository } from "../data-interaction/database/repositories/user/user.repository";

@Injectable()
export class ContractService extends BaseService<ContractEntity, any, any> {
  constructor(
    private repository: ContractRepository,
    private workRequestRepo: WorkRequestRepository,
    private userRepo: UserRepository
  ) {
    super(repository);
  }

  async list(professionalId: string) {
    const profeesional = await this.userRepo.findById(professionalId)
    if(!profeesional) throw new NotFoundException('Professional not found')
    return await this.repository.findByProfessional(professionalId);
  }

  async listByBeneficiary(userId: string) {
    return await this.repository.findByBeneficiary(userId);
  }

  async getById(workRequestId: string) {
    return await this.repository.findByIdContract(workRequestId);
  }

  async register(data: CreateContractRequestDto) {
    const workRequest = await this.workRequestRepo.findById2(data.workRequestId);
    if (!workRequest) throw new NotFoundException('WorkRequest not found!');
    data.workRequest = workRequest;
    const professional = await this.userRepo.findById(data.professionalId)
    if (!professional) throw new NotFoundException('Professional not found!');
    data.professional = professional
    return await this.repository.create(data);
}


 

  async update(contractId: string, data: CreateContractRequestDto) {
    if(data.workRequestId) {
      const workRequest = await this.workRequestRepo.findById2(data.workRequestId);
      if (!workRequest) throw new NotFoundException('WorkRequest not found!');
      data.workRequest = workRequest;
      delete data.workRequestId
    }
    if(data.professionalId) {
      const professional = await this.userRepo.findById(data.professionalId)
      if (!professional) throw new NotFoundException('Professional not found!');
      data.professional = professional
      delete data.professionalId

    }
    return await super.update(contractId, data);
  }



  async updateStatus(costEstimateId: string, data: ContractUpdateStatusDto) {
    const costEstimate = await this.repository.findById(costEstimateId)
    if (!costEstimate) throw new NotFoundException('Cost Estimate not found!')
    if(data.type === ContractStatusEnum.APPROVED) {
     return await this.repository.acceptContract(costEstimateId, data)
    }
    if(data.type === ContractStatusEnum.REQUEST_CHANGE) {
     return await this.repository.requestAdjust(costEstimateId, data)
    }
    await this.repository.updateStatus(costEstimateId, data)
  }
  
  async cancelContract(costEstimateId: string, data: ContractCancelDto) {

    const costEstimate = await this.repository.findById(costEstimateId)
    if (!costEstimate) throw new NotFoundException('Cost Estimate not found!')
      await this.repository.cancelContract(costEstimateId, data)
  }

  async delete(costEstimateId: string) {
    return await this.repository.hardDelete(costEstimateId);
  }


}
