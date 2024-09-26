import { Request } from "express";
import { EmployeeRegisterRequestDto } from "../../data-interaction/database/dtos/employee/employee-register-request.dto";
import { EmployeeService } from "./employee.service";
export declare class EmployeeController {
    private service;
    private readonly _logger;
    constructor(service: EmployeeService);
    register(dto: EmployeeRegisterRequestDto, req: Request): Promise<import("../../data-interaction/database/entitites/employee.entity").EmployeeEntity>;
    activeEmployee(id: string, req: Request): Promise<import("../../data-interaction/database/entitites/employee.entity").EmployeeEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/employee.entity").EmployeeEntity[]>;
}
