import {  Injectable } from "@nestjs/common";
import { BaseService } from "src/core/services/base.service";
import { ContractEntity } from "src/modules/data-interaction/database/entitites/contract.entity";
import { ContractRepository } from "src/modules/data-interaction/database/repositories/contract/contract.repository";

@Injectable()
export class ContractService extends BaseService<ContractEntity, any, any> {
  constructor(
    private repository: ContractRepository
  ) {
    super(repository);
  }

  async list() {

    return await this.repository.listWithRelations();
  }

  async listById(id: string) {
    return await this.repository.findById(id);
  }


}
