import { CreateConstructionsDto } from "../../data-interaction/database/dtos/constructions/create-constructions.dto";
import { ConstructionsService } from "./constructions.service";
import { Request } from "express";
export declare class ConstructionsController {
    private constructionsService;
    private readonly _logger;
    constructor(constructionsService: ConstructionsService);
    get(): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity[]>;
    getMonth(month: number): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity[]>;
    firstStepPhotos(demandId: string, dto: {
        roomSolutionId: string;
    }, files: Array<Express.Multer.File>, req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    secondStepConstructions(demandId: string, dto: CreateConstructionsDto, req: Request): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    update(demandId: string, dto: CreateConstructionsDto, req: Request): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity>;
    deletePhoto(demandId: string, photoId: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    finishConstructions(demandId: string, req: Request): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity>;
}
