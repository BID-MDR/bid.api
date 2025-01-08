import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { RoomRepository } from "src/modules/data-interaction/database/repositories/room/room.repository";
import { CostEstimateEntity } from "src/modules/data-interaction/database/entitites/cost-estimate.entity";
import { CostEstimateRepository } from "src/modules/data-interaction/database/repositories/costEstimate/costEstimate.repository";
import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";
import { CreateCostEstimateRequestDto } from "src/modules/data-interaction/database/dtos/cost-estimate/cost-estimate-request.dto";

@Injectable()
export class CostEstimateService extends BaseService<CostEstimateEntity, any, any> {
  constructor(
    private repository: CostEstimateRepository,
    private roomRepo: RoomRepository,
    private workRequestRepo: WorkRequestRepository
  ) {
    super(repository);
  }

  async list() {
    return await this.repository.findAll();
  }

  async getById(workRequestId: string) {
    return await this.repository.findById(workRequestId);
  }


  async register(data: CreateCostEstimateRequestDto) {
    const workRequest = await this.workRequestRepo.findById(data.workRequestId);
    if (!workRequest) throw new NotFoundException('WorkRequest not found!');
    data.workRequest = workRequest;

    const roomPromisses = data.roomId.map(async (roomId: string) => {
        const roomFound = await this.roomRepo.findById(roomId);
        if (!roomFound) {
            throw new NotFoundException(`Room with ID ${roomId} not found!`);
        }
        return roomFound;
    });

    const roomPromissesResolved = await Promise.all(roomPromisses);
    data.rooms = roomPromissesResolved;


    return await this.repository.create(data);
}


 

  async update(interventionId: string, data: any) {
    return await super.update(interventionId, data);
  }



  async delete(interventionId: string) {
    return await this.repository.hardDelete(interventionId);
  }


}
