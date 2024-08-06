import { Injectable } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { CompanyEntity } from "../../data-interaction/database/entitites/company.entity";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";

@Injectable()
export class CompanyService extends BaseService<CompanyEntity, any, any> {
  constructor(
    private companyRepository: CompanyRepository,
    private demandRepository: DemandRepository
  ) {
    super(companyRepository);
  }
}
