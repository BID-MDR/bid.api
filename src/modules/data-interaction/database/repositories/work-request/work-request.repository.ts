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

  async findByIdAndBringBeneficiary(workRequestId: string): Promise<any> {
    return await this.repository.createQueryBuilder("workRequest")
      .leftJoinAndSelect("workRequest.beneficiary", "beneficiary")
      .where("workRequest.id = :id", { id: workRequestId })
      .getOne();
  }

  async changeContractStatus(workRequestId: string) {
    return await this.repository.update({ id: workRequestId }, { contractStatus: WorkRequestContractStatusEnum.ALREADY_STARTED });
  }

  async findNearbyBeneficiary(
    latitude: number,
    longitude: number,
    radiusInKm: number,
  ) {
    const radiusInMeters = radiusInKm * 1000;
    console.log('teste', latitude, longitude, radiusInKm);

    const query = `
    SELECT 
      wr.*, 
      a.latitude, 
      a.longitude, 
      a.maximumDistanceToWorks, 
      ST_Distance_Sphere(
        point(a.longitude, a.latitude),
        point(?, ?)
      ) AS distanceInMeters
    FROM work_request wr
    INNER JOIN user u ON u.id = wr.beneficiaryId
    INNER JOIN address a ON a.id = u.addressId
    WHERE u.type IN ('BENEFICIARIO')
      AND ST_Distance_Sphere(
        point(a.longitude, a.latitude),
        point(?, ?)
      ) <= a.maximumDistanceToWorks * 1000
  `;


    return this.repository.query(query, [longitude, latitude, radiusInMeters]);
  }

}