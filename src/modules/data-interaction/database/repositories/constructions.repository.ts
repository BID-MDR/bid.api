import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../../../core/repositories/base.repository";
import { ConstructionsEntity } from "../entitites/constructions.entity";
import { addMonths } from "date-fns";
import { ConstructionsStatusEnum } from "../enums/constructions-stauts.enum";
import { UserProgramTypeEnum } from "../enums/user-program-type.enum";

@Injectable()
export class ConstructionsRepository extends BaseRepository<ConstructionsEntity, any, any> {
  constructor(@InjectRepository(ConstructionsEntity) private repository: Repository<ConstructionsEntity>) {
    super(repository);
  }

  async findMonth(month: number) {
    const now = new Date();
    const pastDate = addMonths(now, -month);


    return this.repository.createQueryBuilder('constructions')
    .where('constructions.createdAt BETWEEN :pastDate AND :now', {
      pastDate: pastDate.toISOString(),
      now: now.toISOString(),
    })
    .andWhere('help.programType = :programType', {programType: UserProgramTypeEnum.REGMEL})
    .getMany()
  }

  async findMonthMcmv(month: number) {
    const now = new Date();
    const pastDate = addMonths(now, -month);


    return this.repository.createQueryBuilder('constructions')
    .where('constructions.createdAt BETWEEN :pastDate AND :now', {
      pastDate: pastDate.toISOString(),
      now: now.toISOString(),
    })
    .andWhere('help.programType = :programType', {programType: UserProgramTypeEnum.MINHA_CASA})
    .getMany()
  }

  async CountConcluded(){
    return (await this.repository.find({where: {status: ConstructionsStatusEnum.CONCLUIDA}})).length
  }
}
