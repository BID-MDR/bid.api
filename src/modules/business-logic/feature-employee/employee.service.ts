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
import { EmployeeRoleRepository } from "src/modules/data-interaction/database/repositories/employee/employee-role.repository";
import { CreateEmployeeRoleDto } from "src/modules/data-interaction/database/dtos/employee-role/employee-role-create.dto";

@Injectable()
export class EmployeeService extends BaseService<EmployeeEntity, any, any> {
  constructor(
    private userRepository: UserRepository,
    private companyRepository: CompanyRepository,
    private employeeRepository: EmployeeRepository,
    private demandRepository: DemandRepository,
    private employeeRolesRepository: EmployeeRoleRepository
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

  async updateRole(employeeId: string, data: any, userId: string) {
    const user = await this.userRepository.getById(userId);
  
    if (!user.companyAdministrator) {
      throw new BadRequestException("Usuário não é administrador da empresa.");
    }
  
    const employee = await this.employeeRepository.getById(employeeId);
  
    if (!employee) {
      throw new BadRequestException("Funcionário não encontrado.");
    }
  
    const role = await this.employeeRolesRepository.findById(data.roleId);
  
    if (!role) {
      throw new BadRequestException("Role não encontrada.");
    }
  
    // Atualize o relacionamento
    employee.roles = [role]; // Ou adicione a role ao array existente
    
    await employee.save();
  
    return employee;
  }

  async updateRoleAndActive(employeeId: string, userId: string) {
    const user = await this.userRepository.getById(userId);
  
    if (!user.companyAdministrator) {
      throw new BadRequestException("Usuário não é administrador da empresa.");
    }
  
    const employee = await this.employeeRepository.getById(employeeId);
  
    if (!employee) {
      throw new BadRequestException("Funcionário não encontrado.");
    }

    var newRole: any = {
      description: 'Empregado Comum',
      role: EmployeeRoleEnum.manager_demand,
      employeeId,
      active: true
    };
    
    const role = await this.employeeRolesRepository.create(newRole);
  
    if (!role) {
      throw new BadRequestException("Erro ao criar a Role.");
    }
  
    // Atualize o relacionamento
    employee.roles = [role]; // Ou adicione a role ao array existente
    
    employee.status = EmployeeStatusEnum.ACTIVE;

    await employee.save();
  
    return employee;
  }

  async updateRoleAndReject(employeeId: string, data: any, userId: string) {
    const user = await this.userRepository.getById(userId);
  
    if (!user.companyAdministrator) {
      throw new BadRequestException("Usuário não é administrador da empresa.");
    }
  
    const employee = await this.employeeRepository.getById(employeeId);
  
    if (!employee) {
      throw new BadRequestException("Funcionário não encontrado.");
    }
  
    const role = await this.employeeRolesRepository.findById(data.roleId);
  
    if (!role) {
      throw new BadRequestException("Role não encontrada.");
    }
  
    // Atualize o relacionamento
    employee.roles = [role]; // Ou adicione a role ao array existente
    
    employee.status = EmployeeStatusEnum.BLOCKED;

    await employee.save();
  
    return employee;
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
    return await this.employeeRepository.findAll()
  }
  
  async listByCompany(id: string){
    return await this.employeeRepository.listByCompany(id);
  }
}
