import { BaseService } from "../../../core/services/base.service";
import { EmployeeRepository } from "../../data-interaction/database/repositories/employee/employee.repository";
import { EmployeeRoleRepository } from "../../data-interaction/database/repositories/employee/employee-role.repository";
import { EmployeeRoleEntity } from "src/modules/data-interaction/database/entitites/employee-role.entity";
import { CreateEmployeeRoleDto } from "src/modules/data-interaction/database/dtos/employee-role/employee-role-create.dto";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
export declare class EmployeeRoleService extends BaseService<EmployeeRoleEntity, any, any> {
    private employeeRepository;
    private employeeRoleRepository;
    private userRepository;
    constructor(employeeRepository: EmployeeRepository, employeeRoleRepository: EmployeeRoleRepository, userRepository: UserRepository);
    register(data: CreateEmployeeRoleDto): Promise<EmployeeRoleEntity>;
    activeRole(roleId: string, userId: string): Promise<EmployeeRoleEntity>;
    list(): Promise<EmployeeRoleEntity[]>;
    hardDelete(id: string): Promise<void>;
}
