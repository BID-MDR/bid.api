import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { RoomRepository } from "src/modules/data-interaction/database/repositories/room/room.repository";
import { CostEstimateEntity } from "src/modules/data-interaction/database/entitites/cost-estimate.entity";
import { CostEstimateRepository } from "src/modules/data-interaction/database/repositories/costEstimate/costEstimate.repository";
import { WorkRequestRepository } from "src/modules/data-interaction/database/repositories/work-request/work-request.repository";
import { CreateCostEstimateRequestDto } from "src/modules/data-interaction/database/dtos/cost-estimate/cost-estimate-request.dto";
import { CostEstimateAdjustRequestDto } from "src/modules/data-interaction/database/dtos/cost-estimate/cost-estimate-adjust-request.dto";
import { CostEstimateAproveReproveRequestDto } from "src/modules/data-interaction/database/dtos/cost-estimate/cost-estimate-aprove-reprove-request.dto";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";

@Injectable()
export class CostEstimateService extends BaseService<CostEstimateEntity, any, any> {
  constructor(
    private repository: CostEstimateRepository,
    private roomRepo: RoomRepository,
    private workRequestRepo: WorkRequestRepository,
    private userRepo: UserRepository

  ) {
    super(repository);
  }

  async list() {
    return await this.repository.find();
  }


  async listProfessional(_id:any) {
    return await this.repository.findByProfessional(_id);
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

    const professional  = await this.userRepo.findById(data.professionalId)
    if (!professional) throw new NotFoundException('professional not found!');
    data.professional = professional;


    return await this.repository.create(data);
}


 

  async update(costEstimateId: string, data: any) {
    return await super.update(costEstimateId, data);
  }

  async requestAdjust(costEstimateId: string, data: CostEstimateAdjustRequestDto) {
    const costEstimate = await this.repository.findById(costEstimateId)
    if (!costEstimate) throw new NotFoundException('Cost Estimate not found!')
      await this.repository.requestAdjust(costEstimateId, data.adjustDetails)
  }

  async updateStatus(costEstimateId: string, data: CostEstimateAproveReproveRequestDto) {
    const costEstimate = await this.repository.findById(costEstimateId)
    if (!costEstimate) throw new NotFoundException('Cost Estimate not found!')
      await this.repository.updateStatus(costEstimateId, data)
  }

  async delete(costEstimateId: string) {
    return await this.repository.hardDelete(costEstimateId);
  }


}
