import { Request } from "express";
import { CreateTechnicalVisitDto } from "src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit.dto";
import { UpdateTechnicalVisitDto } from "src/modules/data-interaction/database/dtos/technical-visit/update-technical-visit.dto";
import { FeatureTechnicalVisitService } from "./feature-technical-visit.service";
import { ResponseDto } from "src/core/dtos/response.dto";
export declare class FeatureTechnicalVisitController {
    private featureTechnicalVisitService;
    private readonly _logger;
    constructor(featureTechnicalVisitService: FeatureTechnicalVisitService);
    listLogged(req: Request): Promise<ResponseDto<import("../../data-interaction/database/entitites/technical-visit.entity").TechnicalVisitEntity[]>>;
    getById(id: string): Promise<import("../../data-interaction/database/entitites/technical-visit.entity").TechnicalVisitEntity>;
    create(body: CreateTechnicalVisitDto): Promise<ResponseDto<import("../../data-interaction/database/entitites/technical-visit.entity").TechnicalVisitEntity>>;
    update(req: Request, body: UpdateTechnicalVisitDto): Promise<import("../../data-interaction/database/entitites/technical-visit.entity").TechnicalVisitEntity>;
}
