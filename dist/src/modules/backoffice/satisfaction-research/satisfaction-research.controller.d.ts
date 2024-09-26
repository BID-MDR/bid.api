import { Request } from "express";
import { SatisfactionResearchBackofficeService } from "./satisfaction-research.service";
export declare class SatisfactionResearchBackofficeController {
    private service;
    private readonly _logger;
    constructor(service: SatisfactionResearchBackofficeService);
    register(dto: any, req: Request, workRequestId: string): Promise<import("../../data-interaction/database/entitites/satisfaction-research.entity").SatisfactionResearchEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/satisfaction-research.entity").SatisfactionResearchEntity[]>;
    listBeneficiary(): Promise<import("../../data-interaction/database/entitites/satisfaction-research.entity").SatisfactionResearchEntity[]>;
    listBeneficiaryMonth(month: number): Promise<import("../../data-interaction/database/entitites/satisfaction-research.entity").SatisfactionResearchEntity[]>;
    listProfessional(): Promise<import("../../data-interaction/database/entitites/satisfaction-research.entity").SatisfactionResearchEntity[]>;
    listProfessionalMonth(month: number): Promise<import("../../data-interaction/database/entitites/satisfaction-research.entity").SatisfactionResearchEntity[]>;
    delete(id: string): Promise<void>;
}
