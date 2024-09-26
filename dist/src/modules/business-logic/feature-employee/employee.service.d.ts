import { BaseService } from "../../../core/services/base.service";
import { EmployeeRegisterRequestDto } from "../../data-interaction/database/dtos/employee/employee-register-request.dto";
import { EmployeeEntity } from "../../data-interaction/database/entitites/employee.entity";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";
import { EmployeeRepository } from "../../data-interaction/database/repositories/employee/employee.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { UserRepository } from "../../data-interaction/database/repositories/user/user.repository";
export declare class EmployeeService extends BaseService<EmployeeEntity, any, any> {
    private userRepository;
    private companyRepository;
    private employeeRepository;
    private demandRepository;
    constructor(userRepository: UserRepository, companyRepository: CompanyRepository, employeeRepository: EmployeeRepository, demandRepository: DemandRepository);
    register(data: EmployeeRegisterRequestDto, userId: string): Promise<EmployeeEntity>;
    activeEmployee(employeeId: string, userId: string): Promise<EmployeeEntity>;
    list(): Promise<EmployeeEntity[]>;
}
