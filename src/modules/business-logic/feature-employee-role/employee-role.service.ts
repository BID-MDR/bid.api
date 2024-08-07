import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { EmployeeRepository } from "../../data-interaction/database/repositories/employee/employee.repository";
import { EmployeeRoleRepository } from "../../data-interaction/database/repositories/employee/employee-role.repository";
import { EmployeeRoleEntity } from "src/modules/data-interaction/database/entitites/employee-role.entity";
import { CreateEmployeeRoleDto } from "src/modules/data-interaction/database/dtos/employee-role/employee-role-create.dto";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";

@Injectable()
export class EmployeeRoleService extends BaseService<EmployeeRoleEntity, any, any> {
  constructor(
    private employeeRepository: EmployeeRepository,
    private employeeRoleRepository: EmployeeRoleRepository,
    private userRepository: UserRepository
  
  ) {
    super(employeeRoleRepository);
  }

  async register(data: CreateEmployeeRoleDto): Promise<EmployeeRoleEntity> {
    const employee = await this.employeeRepository.getById(data.employeeId);
    if (!employee) throw new BadRequestException('Funcionário não encontrado(a).')
    data.employee = employee
    data.active = false
    return await this.employeeRoleRepository.create(data)
  }

  async activeRole(roleId: string, userId: string):Promise<EmployeeRoleEntity>{
    const user = await this.userRepository.getUserCompany(userId);

    if (!user.companyAdministrator) {
      throw new BadRequestException("Usuário não é administrador da empresa.");
    }
    const employeeRole = await this.employeeRoleRepository.findById(roleId)
    if (!employeeRole) throw new BadRequestException('Função não encontrada.')
   return  await this.employeeRoleRepository.update(roleId, { active: true });
  }

  async list():Promise<EmployeeRoleEntity[]>{
    return await this.employeeRoleRepository.findAll()
  }
  async hardDelete(id: string): Promise<void> {
      return await this.employeeRoleRepository.hardDelete(id)
  }

}
