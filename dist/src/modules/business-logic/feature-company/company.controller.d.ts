import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "src/modules/data-interaction/database/dtos/company/create-company.dto";
export declare class CompanyController {
    private service;
    private readonly _logger;
    constructor(service: CompanyService);
    register(dto: CreateCompanyDto): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity[]>;
    getByOwner(id: string): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity[]>;
    getByEmployee(id: string): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity>;
    delete(id: string): Promise<void>;
}
