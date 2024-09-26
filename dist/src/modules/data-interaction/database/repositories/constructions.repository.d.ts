import { Repository } from "typeorm";
import { BaseRepository } from "../../../../core/repositories/base.repository";
import { ConstructionsEntity } from "../entitites/constructions.entity";
export declare class ConstructionsRepository extends BaseRepository<ConstructionsEntity, any, any> {
    private repository;
    constructor(repository: Repository<ConstructionsEntity>);
    findMonth(month: number): Promise<ConstructionsEntity[]>;
    CountConcluded(): Promise<number>;
}
