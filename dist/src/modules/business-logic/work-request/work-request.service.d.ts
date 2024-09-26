import { BaseService } from "../../../core/services/base.service";
import { CreateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/create-work-request.dto";
import { UpdateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/update-work-request.dto";
import { WorkRequestEntity } from "../../data-interaction/database/entitites/work-request.entity";
import { WorkRequestRepository } from "../../data-interaction/database/repositories/work-request/work-request.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { TechnicalVisitStatusEnum } from "src/modules/data-interaction/database/enums/technical-visit-status.enum";
export declare class WorkRequestService extends BaseService<WorkRequestEntity, CreateWorkRequestDto, UpdateWorkRequestDto> {
    private workRequestRepository;
    private demandRepository;
    constructor(workRequestRepository: WorkRequestRepository, demandRepository: DemandRepository);
    list(): Promise<WorkRequestEntity[]>;
    getById(workRequestId: string): Promise<WorkRequestEntity>;
    register(data: CreateWorkRequestDto, companyId: string): Promise<WorkRequestEntity>;
    update(workRequestId: string, data: UpdateWorkRequestDto): Promise<WorkRequestEntity>;
    updateStatus(workRequestId: string, status: TechnicalVisitStatusEnum): Promise<WorkRequestEntity>;
    delete(workRequestId: string): Promise<void>;
    carryOut(workRequestId: string, companyId: string): Promise<WorkRequestEntity>;
    cancel(workRequestId: string): Promise<WorkRequestEntity>;
}
