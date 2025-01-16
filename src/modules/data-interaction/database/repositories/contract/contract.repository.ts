import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContractEntity } from "../../entitites/contract.entity";
import { CreateContractRequestDto } from "../../dtos/contract/contract-request.dto";
import { ContractUpdateStatusDto } from "../../dtos/contract/contract-update-status.dto";
import { ContractCancelDto } from "../../dtos/contract/contract-cancel.dto";
import { ContractStatusEnum } from "../../enums/contract-status.enum";

@Injectable()
export class ContractRepository extends BaseRepository<
  ContractEntity,
  CreateContractRequestDto,
  CreateContractRequestDto
> {
  constructor(
    @InjectRepository(ContractEntity)
    private repository: Repository<ContractEntity>,
  ) {
    super(repository);
  }

  // async requestAdjust(costEstimateId: string, adjustDetail: string) {
  //   return await this.repository.update({ id: costEstimateId }, {adjustDetails: adjustDetail, type: CostEstimateStatusEnum.CHANGE_SOLICITATION});
  // }

  async findById2(costEstimateId: string): Promise<ContractEntity> {
    return await this.repository.findOne({
      where: { id: costEstimateId },
      relations: [ 'workRequest', 'workRequest.room'],
    });
  }
  
  async find(): Promise<ContractEntity[]> {
    return await this.repository.find({
      relations: ['workRequest', 'workRequest.room'],
    });
  }

  async findByIdContract(id: string): Promise<ContractEntity> {
    return await this.repository.findOne({
      where: { id: id },
      relations: [ 'workRequest', 'workRequest.room'],
    });
  }
  
  async updateStatus(costEstimateId: string, dto: ContractUpdateStatusDto) {

      return await this.repository.update({ id: costEstimateId }, { status: dto.type, acceptDate: new Date() });
   
  }


  async acceptContract(costEstimateId: string, dto: ContractUpdateStatusDto) {

    return await this.repository.update({ id: costEstimateId }, { status: dto.type, acceptDate: new Date() });
 
}

  async requestAdjust(costEstimateId: string, dto: ContractUpdateStatusDto) {

      return await this.repository.update({ id: costEstimateId }, { status: dto.type , adjustRequested: dto.adjustRequested});

  }
  
  async cancelContract(costEstimateId: string, dto: ContractCancelDto) {

    return await this.repository.update({ id: costEstimateId }, { cancelReasonEnum: dto.cancelReasonEnum , cancelationReason: dto.cancelationReason, status: ContractStatusEnum.REPROVED});

  }

}