import { BaseService } from "../../../core/services/base.service";
import { CompanyEntity } from "../../data-interaction/database/entitites/company.entity";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { CreateCompanyDto } from "src/modules/data-interaction/database/dtos/company/create-company.dto";
export declare class CompanyService extends BaseService<CompanyEntity, any, any> {
    private companyRepository;
    private demandRepository;
    private userRepository;
    constructor(companyRepository: CompanyRepository, demandRepository: DemandRepository, userRepository: UserRepository);
    register(dto: CreateCompanyDto): Promise<CompanyEntity>;
    list(): Promise<CompanyEntity[]>;
    getByOwner(id: string): Promise<CompanyEntity[]>;
    getByEmployee(id: string): Promise<CompanyEntity>;
    delete(companyId: string): Promise<void>;
}
