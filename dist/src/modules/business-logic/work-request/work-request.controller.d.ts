import { CreateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/create-work-request.dto";
import { UpdateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/update-work-request.dto";
import { WorkRequestService } from "./work-request.service";
import { Request } from "express";
export declare class WorkRequestController {
    private service;
    private readonly _logger;
    constructor(service: WorkRequestService);
    list(): Promise<import("../../data-interaction/database/entitites/work-request.entity").WorkRequestEntity[]>;
    getById(id: string): Promise<import("../../data-interaction/database/entitites/work-request.entity").WorkRequestEntity>;
    create(dto: CreateWorkRequestDto, req: Request): Promise<import("../../data-interaction/database/entitites/work-request.entity").WorkRequestEntity>;
    update(id: string, dto: UpdateWorkRequestDto): Promise<import("../../data-interaction/database/entitites/work-request.entity").WorkRequestEntity>;
    carryOut(id: string, req: Request): Promise<import("../../data-interaction/database/entitites/work-request.entity").WorkRequestEntity>;
}
