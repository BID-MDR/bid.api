import { BaseEntity } from "../../../../core/entities/base.entity";
import { EmployeeRoleEnum } from "../enums/employee-role.enum";
import { EmployeeEntity } from "./employee.entity";
export declare class EmployeeRoleEntity extends BaseEntity {
    role: EmployeeRoleEnum;
    description: string;
    active: boolean;
    employee: EmployeeEntity;
}
