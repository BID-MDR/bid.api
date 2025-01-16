import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ContractResignedEntity } from "../../entitites/contract-resigned.entity";
import { CreateContractResignedRequestDto } from "../../dtos/contract-resigned/contract-resigned-request.dto";
import { CreateContractResignedUpdateStatusRequestDto } from "../../dtos/contract-resigned/contract-resigned-update-status-request.dto";

@Injectable()
export class ContractResignedRepository extends BaseRepository<
  ContractResignedEntity,
  CreateContractResignedRequestDto,
  CreateContractResignedRequestDto
> {
  constructor(
    @InjectRepository(ContractResignedEntity)
    private repository: Repository<ContractResignedEntity>,
  ) {
    super(repository);
  }

  async findById(contractResignedId: string): Promise<ContractResignedEntity> {
    return await this.repository.findOne({
      where: { id: contractResignedId },
      relations: [ 'workRequest', 'workRequest.room'],
    });
  }
  async find(): Promise<ContractResignedEntity[]> {
    return await this.repository.find({
      relations: ['workRequest', 'workRequest.room'],
    });
  }

  async updateContractResignedStatus(contractResignedId: string, dto: CreateContractResignedUpdateStatusRequestDto) {

    return await this.repository.update({ id: contractResignedId }, { status: dto.status});
 
  }

  async updateContractResignedReason(contractResignedId: string, dto: CreateContractResignedUpdateStatusRequestDto) {

      return await this.repository.update({ id: contractResignedId }, { reason: dto.reason });

  }
  
}