import { BaseEntity } from "src/core/entities/base.entity";
import { AddressEntity } from "./address.entity";
import { EmployeeEntity } from "./employee.entity";
import { UserEntity } from "./user.entity";
import { CompanyStatusEnum } from "../enums/company-status.enum";
import { DemandEntity } from "./demand.entity";
export declare class CompanyEntity extends BaseEntity {
    name: string;
    cnpj: string;
    status: CompanyStatusEnum;
    addresses: AddressEntity;
    userAdmin: UserEntity;
    employees: EmployeeEntity[];
    demands: DemandEntity[];
}
