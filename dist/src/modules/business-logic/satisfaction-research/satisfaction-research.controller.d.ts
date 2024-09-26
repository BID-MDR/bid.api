import { Request } from "express";
import { SatisfactionResearchService } from "./satisfaction-research.service";
export declare class SatisfactionResearchController {
    private service;
    private readonly _logger;
    constructor(service: SatisfactionResearchService);
    register(dto: any, req: Request, workRequestId: string): Promise<import("../../data-interaction/database/entitites/satisfaction-research.entity").SatisfactionResearchEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/satisfaction-research.entity").SatisfactionResearchEntity[]>;
    delete(id: string): Promise<void>;
}
