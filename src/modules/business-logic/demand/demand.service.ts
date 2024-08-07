import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "src/core/services/base.service";
import { DemandRegisterRequestDto } from "src/modules/data-interaction/database/dtos/demand/register-demand.dto";
import { StatusDemandDto } from "src/modules/data-interaction/database/dtos/demand/update-status-demand.dto";
import { DemandEntity } from "src/modules/data-interaction/database/entitites/demand.entity";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { DemandRepository } from "src/modules/data-interaction/database/repositories/user/demand.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";

@Injectable()
export class DemandService extends BaseService<DemandEntity, DemandRegisterRequestDto, DemandRegisterRequestDto> {
  constructor(
    private demandRepository: DemandRepository,
    private companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ) {
    super(demandRepository);
  }

  async listByUser(userId: string) {
    // const user = await this.userRepository.getById(userId);
    return await this.demandRepository.listByUser(userId);
  }

  async listForVisit(userId: string) {
    return await this.demandRepository.listForVisit(userId);
  }

  async listForConstructions(userId: string) {
    return await this.demandRepository.listForConstructions(userId);
  }

  async listByUserImprovement(userId: string) {
    // const user = await this.userRepository.getById(userId);
    return await this.demandRepository.listByUserWaitImprove(userId);
  }

  async getByWorkRequestId(workRequestId: string) {
    return await this.demandRepository.getByWorkRequestId(workRequestId);
  }
  
  async updateStatus(id: string, status: StatusDemandDto) {
    return await this.demandRepository.updateStatus(id, status);
  }

  async list() {
    return await this.demandRepository.list();
  }

  async register(userId: string, data: DemandRegisterRequestDto) {
    const professional = await this.userRepository.getById(userId);

    if (!professional) {
      throw new BadRequestException("Professional não encontrado.");
    }

    data.company = await this.companyRepository.findById(professional.employee.company.id);

    if (!data.company) {
      throw new BadRequestException("Empresa não encontrada.");
    }

    data.beneficiary = await this.userRepository.getByCpf(data.document);

    if (!data.beneficiary) {
      throw new BadRequestException("Beneficiário não encontrado.");
    }

    return await super.create(data);
  }

  async delete(demandId: string) {
    return await this.demandRepository.hardDelete(demandId);
  }

  async listByStatus(status: DemandStatusEnum) {
    return await this.demandRepository.listByStatus(status);
  }
}
