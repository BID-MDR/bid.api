import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SatisfactionResearchEntity } from "../../entitites/satisfaction-research.entity";
import { BaseRepository } from "src/core/repositories/base.repository";
import { CreateSatisfactionResearchDto } from "../../dtos/satisfaction-research/create-satisfaction-research.dto";
import { UserTypeEnum } from "../../enums/user-type.enum";
import { addMonths } from "date-fns";

@Injectable()
export class SatisfactionResearchRepository extends BaseRepository<SatisfactionResearchEntity, CreateSatisfactionResearchDto, CreateSatisfactionResearchDto> {
  constructor(@InjectRepository(SatisfactionResearchEntity) private repository: Repository<SatisfactionResearchEntity>) {
    super(repository);
  }

  async list(){
    return this.repository.find({
      relations: ['user', 'workRequest'],
    });
  }

  async listBeneficiary(): Promise<SatisfactionResearchEntity[]>{
    return this.repository.createQueryBuilder('satisfaction_research')
    .leftJoinAndSelect('satisfaction_research.user', 'user')
    .where('user.type = :type',{ type:  UserTypeEnum.BENEFICIARIO}).getMany()
  }

  async listBeneficiaryMonth(monthsAgo: number): Promise<SatisfactionResearchEntity[]>{

    const now = new Date();
    const pastDate = addMonths(now, -monthsAgo);


    return this.repository.createQueryBuilder('satisfaction_research')
    .leftJoinAndSelect('satisfaction_research.user', 'user')
    .where('user.type = :type',{ type:  UserTypeEnum.BENEFICIARIO})
    .andWhere('satisfaction_research.createdAt BETWEEN :pastDate AND :now', {
      pastDate: pastDate.toISOString(),
      now: now.toISOString(),
    })
    .getMany()
  }

  async listProfessional(): Promise<SatisfactionResearchEntity[]>{
    return this.repository.createQueryBuilder('satisfaction_research')
    .leftJoinAndSelect('satisfaction_research.user', 'user')
    .where('user.type = :type',{ type:  UserTypeEnum.PROFISSIONAL}).getMany()
  }


  async listProfessionalMonth(monthsAgo: number): Promise<SatisfactionResearchEntity[]>{

    const now = new Date();
    const pastDate = addMonths(now, -monthsAgo);


    return this.repository.createQueryBuilder('satisfaction_research')
    .leftJoinAndSelect('satisfaction_research.user', 'user')
    .where('user.type = :type',{ type:  UserTypeEnum.PROFISSIONAL})
    .andWhere('satisfaction_research.createdAt BETWEEN :pastDate AND :now', {
      pastDate: pastDate.toISOString(),
      now: now.toISOString(),
    })
    .getMany()
  }

}
