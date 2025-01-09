import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { CreateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/create-work-request.dto";
import { InterventionEntity } from "src/modules/data-interaction/database/entitites/intervention.entity";
import { CreateInterventionRequestDto } from "src/modules/data-interaction/database/dtos/intervention/intervention-request.dto";
import { InterventionRepository } from "src/modules/data-interaction/database/repositories/intervention/intervention.repository";
import { RoomRepository } from "src/modules/data-interaction/database/repositories/room/room.repository";

@Injectable()
export class InterventionService extends BaseService<InterventionEntity, CreateInterventionRequestDto, CreateInterventionRequestDto> {
  constructor(
    private repository: InterventionRepository,
    private roomRepo: RoomRepository
    // private demandRepository: DemandRepository,
    //  private userRepository: UserRepository,
    // private sustainabilityItensRepository: SustainabilityItensRepository
  ) {
    super(repository);
  }

  async list() {
    const list =  await this.repository.findAll();
    console.log('lis', list)
    return list
  }

  async getById(workRequestId: string) {
    return await this.repository.findById(workRequestId);
  }


  async register(data: CreateInterventionRequestDto) {
    const room = await this.roomRepo.findById(data.roomId)
    if (!room) throw new NotFoundException('Room not found!')
    data.room = room
    return await this.repository.create(data)
  }

 

  async update(interventionId: string, data: CreateInterventionRequestDto) {
    return await super.update(interventionId, data);
  }



  async delete(interventionId: string) {
    return await this.repository.hardDelete(interventionId);
  }


}
