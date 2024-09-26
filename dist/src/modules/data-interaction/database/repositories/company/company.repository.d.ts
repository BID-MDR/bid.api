import { Repository } from "typeorm";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { CompanyEntity } from "../../entitites/company.entity";
export declare class CompanyRepository extends BaseRepository<CompanyEntity, any, any> {
    private repository;
    constructor(repository: Repository<CompanyEntity>);
    getByOwner(ownerId: string): Promise<CompanyEntity[]>;
    findMonth(month: number): Promise<CompanyEntity[]>;
    getByEmployee(userId: string): Promise<CompanyEntity>;
    find(): Promise<CompanyEntity[]>;
}
