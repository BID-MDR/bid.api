import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { EmployeeEntity } from "../../entitites/employee.entity";
export declare class EmployeeRepository extends BaseRepository<EmployeeEntity, any, any> {
    private repository;
    constructor(repository: Repository<EmployeeEntity>);
    getById(_id: string): Promise<EmployeeEntity>;
    listByCompany(companyId: string): Promise<EmployeeEntity[]>;
}
