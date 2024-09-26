import { BaseService } from "../../../core/services/base.service";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { SatisfactionResearchRepository } from "src/modules/data-interaction/database/repositories/satisfaction-research/satisfaction-research.repository";
import { SatisfactionResearchEntity } from "src/modules/data-interaction/database/entitites/satisfaction-research.entity";
import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";
import { CreateSatisfactionResearchDto } from "src/modules/data-interaction/database/dtos/satisfaction-research/create-satisfaction-research.dto";
export declare class SatisfactionResearchService extends BaseService<SatisfactionResearchEntity, any, any> {
    private workRequestRepository;
    private satisfactionResearchRepository;
    private userRepository;
    constructor(workRequestRepository: WorkRequestRepository, satisfactionResearchRepository: SatisfactionResearchRepository, userRepository: UserRepository);
    register(data: CreateSatisfactionResearchDto, userId: string, workRequestId: string): Promise<SatisfactionResearchEntity>;
    list(): Promise<SatisfactionResearchEntity[]>;
    hardDelete(id: string): Promise<void>;
}
