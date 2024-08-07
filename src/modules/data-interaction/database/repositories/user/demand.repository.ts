import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/repositories/base.repository";
import { DeepPartial, Repository } from "typeorm";
import { DemandRegisterRequestDto } from "../../dtos/demand/register-demand.dto";
import { DemandEntity } from "../../entitites/demand.entity";
import { DemandStatusEnum } from "../../enums/demand-status.enum";
import { StatusDemandDto } from "../../dtos/demand/update-status-demand.dto";

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

    async updateStatus(id: string,dto: StatusDemandDto){
        return this.repository.createQueryBuilder().update('demands').set({status: dto.status}).where("id = :id", {id}).execute()
    }

    async listByUserWaitImprove(userId: string): Promise<DemandEntity[]> {
        const query = this.repository
            .createQueryBuilder("demand")
            .innerJoinAndSelect("demand.beneficiary", "beneficiary")
            .innerJoinAndSelect("demand.company", "company")
            .leftJoinAndSelect("demand.workRequest", "workRequest")
            .leftJoinAndSelect("demand.technicalVisit", "technicalVisit")
            .leftJoinAndSelect("workRequest.room", "room")
            .leftJoinAndSelect("workRequest.welfare", "welfare")
            .where("demand.status = 'ESPERANDO_MELHORIA'")
            // .andWhere("professional.id = :userId", { userId });
            .orWhere("demand.status = 'EM_ANALISE'")

    return await query.getMany();
  }

  async listForVisit(companyId:string = ''): Promise<DemandEntity[]> {
    const query = this.getDefaultQuery()
      .leftJoinAndSelect("room.roomSolutions", "roomSolutions")
      .where("company.id = :companyId", { companyId })
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

  async listForConstructions(companyId:string = ''): Promise<DemandEntity[]> {
    const query = this.getDefaultQuery()
      .where("company.id = :companyId", { companyId })
      .andWhere("demand.status IN (:...status)", {
        status: [DemandStatusEnum.ESPERANDO_OBRA, DemandStatusEnum.CONCLUIR_OBRAS, DemandStatusEnum.CONCLUIDO],
      });

    return await query.getMany();
  }

  async listCanclled(userId: string): Promise<DemandEntity[]> {
    const query = this.getDefaultQuery()
      // .where("professional.id = :userId", { userId })
      .andWhere("demand.status = :status", { status: DemandStatusEnum.CANCELADO });

    return await query.getMany();
  }

  async listByUser(userId: string, companyId:string = ''): Promise<DemandEntity[]> {
    const query = this.getDefaultQuery()
      .where("beneficiary.id = :userId", { userId })
      .orWhere("company.id = :companyId", { companyId });
      

    return await query.getMany();
  }

  async getByWorkRequestId(workRequestId: string): Promise<DemandEntity> {
    const query = this.getDefaultQuery()
    .where("workRequest.id = :workRequestId", { workRequestId });

    return await query.getOne();
  }

  async getByConstructionId(constructionId: string): Promise<DemandEntity> {
    const query = this.getDefaultQuery().where("constructions.id = :constructionId", { constructionId });

    return await query.getOne();
  }

  async list() {
    return this.repository.find();
  }

  private getDefaultQuery() {
    return this.repository
      .createQueryBuilder("demand")
      .innerJoinAndSelect("demand.beneficiary", "beneficiary")
      .innerJoinAndSelect("demand.company", "company")
      .leftJoinAndSelect("company.employees", "employees")
      .leftJoinAndSelect("demand.workRequest", "workRequest")
      .leftJoinAndSelect("demand.technicalVisit", "technicalVisit")
      .leftJoinAndSelect("demand.construction", "constructions")
      .leftJoinAndSelect("workRequest.room", "room")
      .leftJoinAndSelect("workRequest.welfare", "welfare")
      .leftJoinAndSelect("room.roomSolutions", "roomSolution")
      .leftJoinAndSelect("roomSolution.picturesAndVideos", "pictures");
  }
}
