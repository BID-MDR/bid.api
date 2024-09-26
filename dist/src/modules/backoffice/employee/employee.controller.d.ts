import { EmployeeBackofficeService } from "./employee.service";
export declare class EmployeeBackofficeController {
    private service;
    private readonly _logger;
    constructor(service: EmployeeBackofficeService);
    list(): Promise<import("../../data-interaction/database/entitites/employee.entity").EmployeeEntity[]>;
    getById(id: string): Promise<import("../../data-interaction/database/entitites/employee.entity").EmployeeEntity>;
}
