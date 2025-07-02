import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Not, Repository } from "typeorm";
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
  
  async findByProfessional(professionalId: string): Promise<ContractEntity[]> {
    return this.repository.find({
      where: {
        professional: { id: professionalId }, 
      },
      relations: ['professional', 'workRequest', 'workRequest.room', 'workRequest.beneficiary', 'workRequest.beneficiary.address'],
    });
  }

  async findByBeneficiary(userId: string): Promise<ContractEntity[]> {
    return this.repository.find({
        where: {
            workRequest: {
                beneficiary: { id: userId }, 
            },
        },
        relations: [
            'professional',
            'workRequest',
            'workRequest.room',
            'workRequest.beneficiary',
        ],
    });
}

  async getByProfessionalAndStatus(professionalId: string) {
    return this.repository.find({
      where: {
        professional: { id: professionalId },
        status: Not(In(['DELIVERED', 'REPROVED'])), 
      },
      relations: ['professional', 'workRequest', 'workRequest.beneficiary'],
    });
  }  
  async findByIdContract(id: string): Promise<ContractEntity> {
    
    return await this.repository.findOne({
      where: { id: id },
      relations: [ 'professional' , 'workRequest', 'workRequest.room', 'workRequest.beneficiary', 'workRequest.beneficiary.address'],
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