import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "src/core/services/base.service";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { DemandEntity } from "src/modules/data-interaction/database/entitites/demand.entity";
import { DemandRegisterRequestDto } from "src/modules/data-interaction/database/dtos/demand/register-demand.dto";
import { DemandRepository } from "src/modules/data-interaction/database/repositories/user/demand.repository";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { StatusDemandDto } from "src/modules/data-interaction/database/dtos/demand/update-status-demand.dto";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";
import { EmployeeRoleEnum } from "../../data-interaction/database/enums/employee-role.enum";

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

    if (professional) {
      throw new BadRequestException("Professional não encontrado.");
    }

    if (!professional.employee || !professional.companyAdministrator) {
      throw new BadRequestException("O usuário não é um profissional associado à uma empresa.");
    }

    if (professional.employee.status !== "ACTIVE") {
      throw new BadRequestException("O usuário não é um profissional ativo.");
    }

    if (
      !professional.employee.roles.some(
        role => role.role === EmployeeRoleEnum.manager_admin || role.role === EmployeeRoleEnum.manager_demand
      )
    ) {
      throw new BadRequestException("O usuário não tem permissão para criar demandas.");
    }

    data.campany = await this.companyRepository.findById(professional.employee.company.id);

    if (!data.campany) {
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
