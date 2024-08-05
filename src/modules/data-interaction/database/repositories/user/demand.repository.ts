import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/repositories/base.repository";
import { DeepPartial, Repository } from "typeorm";
import { DemandRegisterRequestDto } from "../../dtos/demand/register-demand.dto";
import { DemandEntity } from "../../entitites/demand.entity";
import { DemandStatusEnum } from "../../enums/demand-status.enum";

@Injectable()
export class DemandRepository extends BaseRepository<
  DemandEntity,
  DemandRegisterRequestDto,
  DeepPartial<DemandEntity>
> {
  constructor(
    @InjectRepository(DemandEntity)
    private repository: Repository<DemandEntity>
  ) {
    super(repository);
  }

  async getById(_id: string) {
    return this.repository.findOne({ where: { id: _id }, loadEagerRelations: true });
  }

  async listByStatus(status: DemandStatusEnum): Promise<DemandEntity[]> {
    return this.repository.find({ where: { status }, loadEagerRelations: true });
  }

  async listByUserWaitImprove(userId: string): Promise<DemandEntity[]> {
    const query = this.getDefaulQuery()
      .where("demand.status = 'ESPERANDO_MELHORIA'")
      .andWhere("professional.id = :userId", { userId });

    return await query.getMany();
  }

  async listForVisit(userId: string): Promise<DemandEntity[]> {
    const query = this.getDefaulQuery()
      .leftJoinAndSelect("room.roomSolutions", "roomSolutions")
      .where("professional.id = :userId", { userId })
      .andWhere("demand.status IN (:...statuses)", {
        statuses: [
          DemandStatusEnum.RASCUNHO,
          DemandStatusEnum.CADASTRADO_VISTORIA,
          DemandStatusEnum.ESPERANDO_MELHORIA,
        ],
      })
      .andWhere("roomSolutions.id IS NULL");

    return await query.getMany();
  }

  async listForConstructions(userId: string): Promise<DemandEntity[]> {
    const query = this.getDefaulQuery()
      .where("professional.id = :userId", { userId })
      .andWhere("demand.status IN (:...status)", {
        status: [DemandStatusEnum.ESPERANDO_OBRA, DemandStatusEnum.CONCLUIR_OBRAS, DemandStatusEnum.CONCLUIDO],
      });

    return await query.getMany();
  }

  async listCanclled(userId: string): Promise<DemandEntity[]> {
    const query = this.getDefaulQuery()
      .where("professional.id = :userId", { userId })
      .andWhere("demand.status = :status", { status: DemandStatusEnum.CANCELADO });

    return await query.getMany();
  }

  async listByUser(userId: string): Promise<DemandEntity[]> {
    const query = this.getDefaulQuery()
      .where("beneficiary.id = :userId", { userId })
      .orWhere("professional.id = :userId", { userId });

    return await query.getMany();
  }

  async getByWorkRequestId(workRequestId: string): Promise<DemandEntity> {
    const query = this.getDefaulQuery().where("workRequest.id = :workRequestId", { workRequestId });

    return await query.getOne();
  }

  async getByConstructionId(constructionId: string): Promise<DemandEntity> {
    const query = this.getDefaulQuery().where("constructions.id = :constructionId", { constructionId });

    return await query.getOne();
  }

  async list() {
    return this.repository.find();
  }

  private getDefaulQuery() {
    return this.repository
      .createQueryBuilder("demand")
      .innerJoinAndSelect("demand.beneficiary", "beneficiary")
      .innerJoinAndSelect("demand.professional", "professional")
      .leftJoinAndSelect("demand.workRequest", "workRequest")
      .leftJoinAndSelect("demand.technicalVisit", "technicalVisit")
      .leftJoinAndSelect("demand.construction", "constructions")
      .leftJoinAndSelect("workRequest.room", "room")
      .leftJoinAndSelect("workRequest.welfare", "welfare")
      .leftJoinAndSelect("room.roomSolutions", "roomSolution")
      .leftJoinAndSelect("roomSolution.picturesAndVideos", "pictures");
  }
}
