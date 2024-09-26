import { BaseRepository } from "src/core/repositories/base.repository";
import { DeepPartial, Repository } from "typeorm";
import { DemandRegisterRequestDto } from "../../dtos/demand/register-demand.dto";
import { DemandEntity } from "../../entitites/demand.entity";
import { DemandStatusEnum } from "../../enums/demand-status.enum";
import { StatusDemandDto } from "../../dtos/demand/update-status-demand.dto";
export declare class DemandRepository extends BaseRepository<DemandEntity, DemandRegisterRequestDto, DeepPartial<DemandEntity>> {
    private repository;
    constructor(repository: Repository<DemandEntity>);
    getById(_id: string): Promise<DemandEntity>;
    countVistory(): Promise<any>;
    listByStatus(status: DemandStatusEnum): Promise<DemandEntity[]>;
    updateStatus(id: string, dto: StatusDemandDto): Promise<import("typeorm").UpdateResult>;
    listByUserWaitImprove(companyId: string): Promise<DemandEntity[]>;
    listForVisit(companyId?: string): Promise<DemandEntity[]>;
    listForConstructions(companyId?: string): Promise<DemandEntity[]>;
    listCanclled(userId: string): Promise<DemandEntity[]>;
    listByUser(userId: string, companyId?: string): Promise<DemandEntity[]>;
    listByCompany(companyId: string): Promise<DemandEntity[]>;
    getByWorkRequestId(workRequestId: string): Promise<DemandEntity>;
    getByConstructionId(constructionId: string): Promise<DemandEntity>;
    list(): Promise<DemandEntity[]>;
    countList(): Promise<number>;
    findMonth(month: number): Promise<DemandEntity[]>;
    private getDefaultQuery;
}
