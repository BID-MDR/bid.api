import {  Injectable, NotFoundException } from "@nestjs/common";

import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";

import { ContractRepository } from "../data-interaction/database/repositories/contract/contract.repository";
import { BaseService } from "src/core/services/base.service";
import { ContractEntity } from "../data-interaction/database/entitites/contract.entity";
import { CreateContractRequestDto } from "../data-interaction/database/dtos/contract/contract-request.dto";
import { ContractUpdateStatusDto } from "../data-interaction/database/dtos/contract/contract-update-status.dto";
import { ContractCancelDto } from "../data-interaction/database/dtos/contract/contract-cancel.dto";
import { ContractStatusEnum } from "../data-interaction/database/enums/contract-status.enum";

@Injectable()
export class ContractService extends BaseService<ContractEntity, any, any> {
  constructor(
    private repository: ContractRepository,
    private workRequestRepo: WorkRequestRepository
  ) {
    super(repository);
  }

  async list() {
    return await this.repository.find();
  }

  async getById(workRequestId: string) {
    return await this.repository.findByIdContract(workRequestId);
  }

  async register(data: CreateContractRequestDto) {
    const workRequest = await this.workRequestRepo.findById2(data.workRequestId);
    if (!workRequest) throw new NotFoundException('WorkRequest not found!');
    data.workRequest = workRequest;
    return await this.repository.create(data);
}


 

  async update(costEstimateId: string, data: any) {
    return await super.update(costEstimateId, data);
  }



  async updateStatus(costEstimateId: string, data: ContractUpdateStatusDto) {
    console.log('111')
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
