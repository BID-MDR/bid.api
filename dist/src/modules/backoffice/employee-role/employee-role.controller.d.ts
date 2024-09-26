import { EmployeeRoleBackofficeService } from "./employee-role.service";
import { CreateEmployeeRoleDto } from "src/modules/data-interaction/database/dtos/employee-role/employee-role-create.dto";
export declare class EmployeeRoleBackofficeController {
    private service;
    private readonly _logger;
    constructor(service: EmployeeRoleBackofficeService);
    register(dto: CreateEmployeeRoleDto): Promise<import("../../data-interaction/database/entitites/employee-role.entity").EmployeeRoleEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/employee-role.entity").EmployeeRoleEntity[]>;
}
