import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWorkRequestDto } from "../../dtos/work-request/create-work-request.dto";
import { UpdateWorkRequestDto } from "../../dtos/work-request/update-work-request.dto";
import { WorkRequestContractStatusEnum } from "../../enums/work-request-contact-status.enum";

@Injectable()
export class WorkRequestRepository extends BaseRepository<
  WorkRequestEntity,
  CreateWorkRequestDto,
  UpdateWorkRequestDto
> {
  constructor(
    @InjectRepository(WorkRequestEntity)
    private repository: Repository<WorkRequestEntity>,
  ) {
    super(repository);
  }

  async getByUserId(userId: string) {
    const relations = this.repository.metadata.relations.map((rel) => rel.propertyPath);

    return await this.repository.find({
      where: { beneficiary: { id: userId } },
      relations,
    });
  }

    async findById2(id: string): Promise<WorkRequestEntity> {
      return await this.repository.findOne({
        where: { id: id },
      });
    }

  async changeContractStatus(workRequestId: string, ) {
    return await this.repository.update({ id: workRequestId }, {contractStatus: WorkRequestContractStatusEnum.ALREADY_STARTED});
  }

}