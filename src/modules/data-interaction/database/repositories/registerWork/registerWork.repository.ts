import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterWorkEntity } from "../../entitites/register-work.entity";
import { RegisterWorkCreateDto } from "../../dtos/register-work/register-work.dto";
import { RegisterWorkStatusEnum } from "../../enums/register-work.enum";
import { ConstructionsStatusEnum } from "../../enums/constructions-stauts.enum";

@Injectable()
export class RegisterWorkRepository extends BaseRepository<
  RegisterWorkEntity,
  RegisterWorkCreateDto,
  RegisterWorkCreateDto
> {
  constructor(
    @InjectRepository(RegisterWorkEntity)
    private repository: Repository<RegisterWorkEntity>,
  ) {
    super(repository);
  }

  async findById(costEstimateId: string): Promise<RegisterWorkEntity> {
    return await this.repository.findOne({
      where: { id: costEstimateId },
   //   relations: [ 'workRequest', 'workRequest.room'],
    });
  }
  async find(): Promise<RegisterWorkEntity[]> {
    return await this.repository.find({
      //relations: ['workRequest', 'workRequest.room'],
    });
  }
  async startRegisterWork(registerWorkId: string, ) {
    return await this.repository.update({ id: registerWorkId }, {startedDate: new Date(), status: ConstructionsStatusEnum.EM_ANDAMENTO});
  }

  async endRegisterWork(registerWorkId: string, ) {
    return await this.repository.update({ id: registerWorkId }, {concludedDate: new Date(), status: ConstructionsStatusEnum.FINALIZADA});
  }

}