import { BaseService } from "src/core/services/base.service";
import { DemandRegisterRequestDto } from "src/modules/data-interaction/database/dtos/demand/register-demand.dto";
import { StatusDemandDto } from "src/modules/data-interaction/database/dtos/demand/update-status-demand.dto";
import { DemandEntity } from "src/modules/data-interaction/database/entitites/demand.entity";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { DemandRepository } from "src/modules/data-interaction/database/repositories/user/demand.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { CompanyRepository } from "../../data-interaction/database/repositories/company/company.repository";
export declare class DemandService extends BaseService<DemandEntity, DemandRegisterRequestDto, DemandRegisterRequestDto> {
    private demandRepository;
    private companyRepository;
    private readonly userRepository;
    constructor(demandRepository: DemandRepository, companyRepository: CompanyRepository, userRepository: UserRepository);
    listByUser(userId: string): Promise<DemandEntity[]>;
    listForVisit(userId: string): Promise<DemandEntity[]>;
    listForConstructions(userId: string): Promise<DemandEntity[]>;
    listByUserImprovement(userId: string): Promise<DemandEntity[]>;
    getByWorkRequestId(workRequestId: string): Promise<DemandEntity>;
    updateStatus(id: string, dto: StatusDemandDto): Promise<DemandEntity>;
    list(): Promise<DemandEntity[]>;
    register(userId: string, data: DemandRegisterRequestDto): Promise<DemandEntity>;
    delete(demandId: string): Promise<void>;
    listByStatus(status: DemandStatusEnum): Promise<DemandEntity[]>;
    confirmConclusion(id: string, userId: string): Promise<DemandEntity>;
    private checkStatusForWorkRequest;
    private checkStatusForImprovement;
    private checkStatusForConstruction;
    private checkIsOlderStatus;
}
