import { BaseEntity } from "../../../../core/entities/base.entity";
import { EmployeeStatusEnum } from "../enums/employee-status.enum";
import { CompanyEntity } from "./company.entity";
import { UserEntity } from "./user.entity";
import { EmployeeRoleEntity } from "./employee-role.entity";
export declare class EmployeeEntity extends BaseEntity {
    company: CompanyEntity;
    user: UserEntity;
    status: EmployeeStatusEnum;
    roles: EmployeeRoleEntity[];
}
