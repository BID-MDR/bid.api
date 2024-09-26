import { DemandRegisterRequestDto } from "src/modules/data-interaction/database/dtos/demand/register-demand.dto";
import { StatusDemandDto } from "src/modules/data-interaction/database/dtos/demand/update-status-demand.dto";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { DemandBackofficeService } from "./demand.service";
import { Request } from "express";
export declare class DemandBackofficeController {
    private demandService;
    private readonly _logger;
    constructor(demandService: DemandBackofficeService);
    getLogged(): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    getByMonth(month: any): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    getById(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    getByWorkRequesId(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    getByProfessionalId(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    getByCompany(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    getByProfessionalIdImprovement(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    changeStatus(id: string, status: StatusDemandDto): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    listVisit(req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    listForConstructions(req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    register(req: Request, dto: DemandRegisterRequestDto): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    delete(id: string): Promise<void>;
    listByStatus(status: DemandStatusEnum): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    confirmConclusion(id: string, req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
}
