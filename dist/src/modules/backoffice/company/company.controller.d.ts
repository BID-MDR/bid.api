import { CompanyBackofficeService } from "./company.service";
import { CreateCompanyDto } from "src/modules/data-interaction/database/dtos/company/create-company.dto";
export declare class CompanyBackofficeController {
    private service;
    private readonly _logger;
    constructor(service: CompanyBackofficeService);
    register(dto: CreateCompanyDto): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity[]>;
    listByMonth(month: any): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity[]>;
    getById(id: string): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity>;
    getByOwner(id: string): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity[]>;
    getByEmployee(id: string): Promise<import("../../data-interaction/database/entitites/company.entity").CompanyEntity>;
    delete(id: string): Promise<void>;
}
