import { Request } from "express";
import { EmployeeRoleService } from "./employee-role.service";
import { CreateEmployeeRoleDto } from "src/modules/data-interaction/database/dtos/employee-role/employee-role-create.dto";
export declare class EmployeeRoleController {
    private service;
    private readonly _logger;
    constructor(service: EmployeeRoleService);
    register(dto: CreateEmployeeRoleDto): Promise<import("../../data-interaction/database/entitites/employee-role.entity").EmployeeRoleEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/employee-role.entity").EmployeeRoleEntity[]>;
    activeEmployee(id: string, req: Request): Promise<import("../../data-interaction/database/entitites/employee-role.entity").EmployeeRoleEntity>;
    delete(id: string): Promise<void>;
}
