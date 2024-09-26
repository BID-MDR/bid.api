import { Request } from "express";
import { DemandRegisterRequestDto } from "src/modules/data-interaction/database/dtos/demand/register-demand.dto";
import { DemandService } from "./demand.service";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { StatusDemandDto } from "src/modules/data-interaction/database/dtos/demand/update-status-demand.dto";
export declare class DemandController {
    private demandService;
    private readonly _logger;
    constructor(demandService: DemandService);
    getLogged(req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    getById(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    getByWorkRequesId(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    getByProfessionalId(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    getByProfessionalIdImprovement(id: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    changeStatus(id: string, status: StatusDemandDto): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    listVisit(req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    listForConstructions(req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    register(req: Request, dto: DemandRegisterRequestDto): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    delete(id: string): Promise<void>;
    listByStatus(status: DemandStatusEnum): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity[]>;
    confirmConclusion(id: string, req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
}
