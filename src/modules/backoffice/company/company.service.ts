import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { CompanyEntity } from "../../data-interaction/database/entitites/company.entity";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { CreateCompanyDto } from "src/modules/data-interaction/database/dtos/company/create-company.dto";

@Injectable()
export class CompanyBackofficeService extends BaseService<CompanyEntity, any, any> {
  constructor(
    private companyRepository: CompanyRepository,
    private demandRepository: DemandRepository,
    private userRepository: UserRepository
  ) {
    super(companyRepository);
  }

  async register(dto: CreateCompanyDto): Promise<CompanyEntity> {
    const admin = await this.userRepository.getByCpf(dto.ownerCpf)
    if(!admin)  throw new BadRequestException("Admin não encontrado(a).");
    dto.userAdmin = admin
    return await this.companyRepository.create(dto)
  }
  async list(): Promise<CompanyEntity[]>{
    return await this.companyRepository.findAll()
  }

  async listByMonth(month: number): Promise<CompanyEntity[]>{
    return await this.companyRepository.findMonth(month)
  }

  async getByOwner(id:string):Promise<CompanyEntity[]>{
    return await this.companyRepository.getByOwner(id)
  }

  async getByEmployee(id:string):Promise<CompanyEntity>{
    return await this.companyRepository.getByEmployee(id)
  }

  async delete(companyId: string): Promise<void>{
    return await this.companyRepository.hardDelete(companyId)
  }

  async getById(companyId:string): Promise<CompanyEntity>{
    return await this.companyRepository.findById(companyId);
  }
}
