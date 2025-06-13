import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWorkRequestDto } from "../../dtos/work-request/create-work-request.dto";
import { UpdateWorkRequestDto } from "../../dtos/work-request/update-work-request.dto";
import { WorkRequestContractStatusEnum } from "../../enums/work-request-contact-status.enum";
import { RoomEntity } from "../../entitites/room.entity";

@Injectable()
export class WorkRequestRepository extends BaseRepository<
  WorkRequestEntity,
  CreateWorkRequestDto,
  UpdateWorkRequestDto
> {
  constructor(
    @InjectRepository(WorkRequestEntity)
    private repository: Repository<WorkRequestEntity>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {
    super(repository);
  }

  async getByUserIdteste(userId: string) {
    const relations = this.repository.metadata.relations.map((rel) => rel.propertyPath);

    return await this.repository.find({
      where: { beneficiary: { id: userId } },
      relations,
    });
  }

  async updateAll(workRequestId: string, dto: UpdateWorkRequestDto) {

  const workRequest = await this.repository.findOne({
    where: { id: workRequestId },
    relations: ['improvementRoom'],
  });


  Object.assign(workRequest, dto);


  if (dto.improvementRoom) {
 
    workRequest.improvementRoom = dto.improvementRoom.map(roomDto =>
      this.roomRepository.create({
        ...roomDto,
        workRequestImprovementRoom: workRequest,
      }),
    );
  }

  return await this.repository.save(workRequest);
}

  async getByUserId(userId: string) {
    const relations = [
      'beneficiary',
      'demand',
      // 'workRequest',
      'contracts',
      'contractResignedList',
      'improvementRoom',
      'welfare',
      'room'
  ];

  return await this.repository.find({
      where: { beneficiary: { id: userId } },
      relations,
  });
  }

  async findById2(id: string) {
    // const relations = this.repository.metadata.relations.map((rel) => rel.propertyPath);

      const relations = [
        'beneficiary',
        'demand',
        'contracts',
        'contractResignedList',
        'improvementRoom',
        'welfare',
        'room',
        'beneficiary.address' 
      ];
    return await this.repository.findOne({
      where: { id: id },
      relations,
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

    const query = `
     SELECT 
  wr.*,
  u.name,
  a.latitude, 
  a.longitude, 
  ST_Distance_Sphere(
    point(a.longitude, a.latitude),
    point(?, ?)
  ) AS distanceInMeters
FROM work_request wr
INNER JOIN user u ON u.id = wr.beneficiaryId
INNER JOIN address a ON a.id = u.addressId
WHERE ST_Distance_Sphere(
    point(a.longitude, a.latitude),
    point(?, ?)
  ) <= ?
    `;

    return this.repository.query(query, [longitude, latitude, longitude, latitude, radiusInMeters]);
  }

}