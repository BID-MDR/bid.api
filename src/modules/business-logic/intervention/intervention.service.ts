import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInterventionRequestDto } from "src/modules/data-interaction/database/dtos/intervention/intervention-request.dto";
import { InterventionEntity } from "src/modules/data-interaction/database/entitites/intervention.entity";
import { InterventionRepository } from "src/modules/data-interaction/database/repositories/intervention/intervention.repository";
import { RoomRepository } from "src/modules/data-interaction/database/repositories/room/room.repository";
import { BaseService } from "../../../core/services/base.service";
import { ContractService } from "../../contract/contract.service";

@Injectable()
export class InterventionService extends BaseService<
  InterventionEntity,
  CreateInterventionRequestDto,
  CreateInterventionRequestDto
> {
  constructor(
    private repository: InterventionRepository,
    private roomRepo: RoomRepository,
    private contractService: ContractService
  ) {
    super(repository);
  }

  async list() {
    const list = await this.repository.findAll();
    console.log("lis", list);
    return list;
  }

  async getById(workRequestId: string) {
    return await this.repository.findById(workRequestId);
  }

  async register(data: CreateInterventionRequestDto) {
    const room = await this.roomRepo.findById(data.roomId);
    if (!room) throw new NotFoundException("Room not found!");
    data.room = room;
    return await this.repository.create(data);
  }

  async update(interventionId: string, data: CreateInterventionRequestDto) {
    const intervention = await this.repository.findById(interventionId);
    if (!intervention) throw new NotFoundException("Intervention not found");

    if (data.roomId) {
      const room = await this.roomRepo.findById(data.roomId);
      if (!room) throw new NotFoundException("Room not found!");
      data.room = room;
      delete data.roomId;
    }

    if (data.step) {
      const currentStep = intervention.step;
      if (!currentStep.split(",").includes(data.step)) {
        data.step = currentStep ? `${currentStep},${data.step}` : data.step;
      } else {
        data.step = currentStep;
      }
    }

    return await super.update(interventionId, data);
  }

  async delete(interventionId: string) {
    return await this.repository.hardDelete(interventionId);
  }

  async deleteAllInterventionsFromRoom(contractId: string, roomId: string) {
    const contract = await this.contractService.getById(contractId);
    if (!contract) {
      throw new NotFoundException(`Contract ${contractId} not found`);
    }

    const room = (contract.workRequest?.room || []).find(
      (r: any) => r.id === roomId
    );
    if (!room) {
      throw new NotFoundException(
        `Room ${roomId} not found for this contract ${contractId}`
      );
    }

    const interventions = await this.repository.find({
      where: { room: { id: roomId } },
    });

    for (const interv of interventions) {
      await this.repository.hardDelete(interv.id);
    }

    return { message: `All interventions from room ${roomId} removed.` };
  }

  async deleteOneInterventionFromRoom(
    contractId: string,
    roomId: string,
    interventionId: string
  ) {
    const contract = await this.contractService.getById(contractId);
    if (!contract) {
      throw new NotFoundException(`Contract ${contractId} not found`);
    }

    const room = (contract.workRequest?.room || []).find(
      (r: any) => r.id === roomId
    );
    if (!room) {
      throw new NotFoundException(
        `Room ${roomId} not found for this contract ${contractId}`
      );
    }

    const intervention = await this.repository.findById(interventionId);
    if (!intervention) {
      throw new NotFoundException(`Intervention ${interventionId} not found`);
    }

    if (!intervention.room || intervention.room.id !== roomId) {
      throw new NotFoundException(
        `Intervention ${interventionId} does not belong to room ${roomId}`
      );
    }

    await this.repository.hardDelete(interventionId);

    return {
      message: `Intervention ${interventionId} deleted from room ${roomId}.`,
    };
  }
}
