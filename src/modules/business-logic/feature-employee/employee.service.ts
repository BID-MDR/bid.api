import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { EmployeeEntity } from "../../data-interaction/database/entitites/employee.entity";
import { EmployeeRepository } from "../../data-interaction/database/repositories/employee/employee.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { UserRepository } from "../../data-interaction/database/repositories/user/user.repository";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";
import { EmployeeRegisterRequestDto } from "../../data-interaction/database/dtos/employee/employee-register-request.dto";
import { EmployeeStatusEnum } from "../../data-interaction/database/enums/employee-status.enum";
import { EmployeeRoleRepository } from "../../data-interaction/database/repositories/employee/employee-role.repository";

@Injectable()
export class EmployeeService extends BaseService<EmployeeEntity, any, any> {
  constructor(
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private employeeRepository: EmployeeRepository,
    private employeeRoleRepository: EmployeeRoleRepository,
    private demandRepository: DemandRepository
  ) {
    super(employeeRepository);
  }

  async register(data: EmployeeRegisterRequestDto, userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new BadRequestException("Usuário não encontrado.");
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
    const user = await this.userRepository.getUserCompany(userId);

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
}
