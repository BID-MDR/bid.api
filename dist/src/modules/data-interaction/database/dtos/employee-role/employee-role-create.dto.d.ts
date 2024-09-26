import { EmployeeEntity } from '../../entitites/employee.entity';
import { EmployeeRoleEnum } from '../../enums/employee-role.enum';
export declare class CreateEmployeeRoleDto {
    description: string;
    role: EmployeeRoleEnum;
    employeeId: string;
    active: boolean;
    employee: EmployeeEntity;
}
