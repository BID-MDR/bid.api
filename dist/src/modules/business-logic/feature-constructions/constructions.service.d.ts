import { RoomSolutionRepository } from "src/modules/data-interaction/database/repositories/room/room-solution.repository";
import { CreateConstructionsDto } from "../../data-interaction/database/dtos/constructions/create-constructions.dto";
import { UserGeneratedMediaRepository } from "../../data-interaction/database/repositories/user/user-generated-media.repository";
import { AwsSubsystem } from "../../data-interaction/facade/apis/storage/aws.subsystem";
import { ConstructionsRepository } from "../../data-interaction/database/repositories/constructions.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
export declare class ConstructionsService {
    private readonly demandRepository;
    private readonly constructionsRepository;
    private readonly roomSolutionService;
    private readonly userGeneratedMediaRepository;
    private readonly S3;
    constructor(demandRepository: DemandRepository, constructionsRepository: ConstructionsRepository, roomSolutionService: RoomSolutionRepository, userGeneratedMediaRepository: UserGeneratedMediaRepository, S3: AwsSubsystem);
    firstStepPhotos(roomSolutionId: string, files: Array<Express.Multer.File>, demandId: string, companyId: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    secondStepConstructions(dto: CreateConstructionsDto, demandId: string, companyId: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    update(dto: CreateConstructionsDto, demandId: string, companyId: string): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity>;
    deletePhoto(demandId: string, photoId: string): Promise<import("../../data-interaction/database/entitites/demand.entity").DemandEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity[]>;
    listByMonth(month: number): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity[]>;
    getById(constructionsId: string): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity>;
    validatePhotos(constructionsId: string): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity>;
    cancel(constructionsId: string): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity>;
    conclude(constructionsId: string, companyId: string): Promise<import("../../data-interaction/database/entitites/constructions.entity").ConstructionsEntity>;
}
