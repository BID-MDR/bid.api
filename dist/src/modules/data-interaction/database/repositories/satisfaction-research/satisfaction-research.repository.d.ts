import { Repository } from "typeorm";
import { SatisfactionResearchEntity } from "../../entitites/satisfaction-research.entity";
import { BaseRepository } from "src/core/repositories/base.repository";
import { CreateSatisfactionResearchDto } from "../../dtos/satisfaction-research/create-satisfaction-research.dto";
export declare class SatisfactionResearchRepository extends BaseRepository<SatisfactionResearchEntity, CreateSatisfactionResearchDto, CreateSatisfactionResearchDto> {
    private repository;
    constructor(repository: Repository<SatisfactionResearchEntity>);
    list(): Promise<SatisfactionResearchEntity[]>;
    listBeneficiary(): Promise<SatisfactionResearchEntity[]>;
    listBeneficiaryMonth(monthsAgo: number): Promise<SatisfactionResearchEntity[]>;
    listProfessional(): Promise<SatisfactionResearchEntity[]>;
    listProfessionalMonth(monthsAgo: number): Promise<SatisfactionResearchEntity[]>;
}
