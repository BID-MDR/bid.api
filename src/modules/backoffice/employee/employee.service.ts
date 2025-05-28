import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { EmployeeRegisterRequestDto } from "../../data-interaction/database/dtos/employee/employee-register-request.dto";
import { EmployeeEntity } from "../../data-interaction/database/entitites/employee.entity";
import { EmployeeRoleEnum } from "../../data-interaction/database/enums/employee-role.enum";
import { EmployeeStatusEnum } from "../../data-interaction/database/enums/employee-status.enum";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";
import { EmployeeRepository } from "../../data-interaction/database/repositories/employee/employee.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { UserRepository } from "../../data-interaction/database/repositories/user/user.repository";

@Injectable()
export class EmployeeBackofficeService extends BaseService<EmployeeEntity, any, any> {
  constructor(
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private employeeRepository: EmployeeRepository,
    private demandRepository: DemandRepository
  ) {
    super(employeeRepository);
  }

  async register(data: EmployeeRegisterRequestDto, userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new BadRequestException("Usuário não encontrado.");
    }

    if(user.companyAdministrator) {
      throw new BadRequestException("Usuário já é administrador de uma empresa.");
    }

    if (user.employee) {
      throw new BadRequestException("Usuário já é funcionário de uma empresa.");
    }

    const company = await this.companyRepository.findById(data.companyId);

    if (!company) {
      throw new BadRequestException("Empresa não encontrada.");
    }

    return await this.employeeRepository.create({
      user,
      company,
      status: EmployeeStatusEnum.PENDING,
      roles: [],
    });
  }

  async activeEmployee(employeeId: string, userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user.companyAdministrator) {
      throw new BadRequestException("Usuário não é administrador da empresa.");
    }

    const employee = await this.employeeRepository.getById(employeeId);

    if (!employee) {
      throw new BadRequestException("Funcionário não encontrado.");
    }

    if (employee.status === EmployeeStatusEnum.ACTIVE) {
      throw new BadRequestException("Funcionário já está ativo.");
    }

    if (employee.company.id !== user.companyAdministrator.id) {
      throw new BadRequestException("Funcionário não pertence a empresa do usuário.");
    }

    return await this.employeeRepository.update(employeeId, {
      status: EmployeeStatusEnum.ACTIVE,
    });
  }

  async list(): Promise<EmployeeEntity[]> {
    return await this.employeeRepository.listAll()
  }

  async getById(id:string): Promise<EmployeeEntity>{
    return await this.employeeRepository.findById(id);
  }
}
