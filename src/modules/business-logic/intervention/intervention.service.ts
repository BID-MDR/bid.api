import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInterventionRequestDto } from "src/modules/data-interaction/database/dtos/intervention/intervention-request.dto";
import { InterventionEntity } from "src/modules/data-interaction/database/entitites/intervention.entity";
import { InterventionRepository } from "src/modules/data-interaction/database/repositories/intervention/intervention.repository";
import { RoomRepository } from "src/modules/data-interaction/database/repositories/room/room.repository";
import { BaseService } from "../../../core/services/base.service";
import { ContractService } from "../../contract/contract.service";
import { CostEstimateService } from "../cost-estimate/costEstimate.service";
import { StorageFacade } from "src/modules/data-interaction/facade/apis/storage/storage.facade";

@Injectable()
export class InterventionService extends BaseService<
  InterventionEntity,
  CreateInterventionRequestDto,
  CreateInterventionRequestDto
> {
  constructor(
    private repository: InterventionRepository,
    private roomRepo: RoomRepository,
    private contractService: ContractService,
    private costEstimateService: CostEstimateService,
    private readonly storageFacade: StorageFacade,
    
  ) {
    super(repository);
  }

  async list() {
    const list = await this.repository.findAll();
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
       if(data.selectedFilesBeginning){
         await Promise.all(
        data.selectedFilesBeginning.map(async (picture) => {
          const imageUrl = await this.storageFacade.uploadMedia(
            picture.mimeType,
            picture.fileName,
            picture.data
          );
          if(!data.beginningPicture){
            data.beginningPicture = []
          }
          data.beginningPicture.push(imageUrl)
          delete data.selectedFilesBeginning
        })
      );
      
    }
    
       if(data.selectedFilesEnding){
         await Promise.all(
        data.selectedFilesEnding.map(async (picture) => {
          const imageUrl = await this.storageFacade.uploadMedia(
            picture.mimeType,
            picture.fileName,
            picture.data
          );
          if(!data.endingPicture){
            data.endingPicture = []
          }
          data.endingPicture.push(imageUrl)
          delete data.selectedFilesEnding
        })
      );
      
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

  async deleteAllInterventionsFromRoomCostEstimate(costEstimateId: string, roomId: string) {
    const costEstimate = await this.costEstimateService.getById(costEstimateId);
    if (!costEstimate) {
      throw new NotFoundException(`Cost Estimate ${costEstimateId} not found`);
    }

    const room = (costEstimate.workRequest?.room || []).find(
      (r: any) => r.id === roomId
    );
    if (!room) {
      throw new NotFoundException(
        `Room ${roomId} not found for this cost estimate ${costEstimateId}`
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

  async deleteOneInterventionFromRoomCostEstimate(
    costEstimateId: string,
    roomId: string,
    interventionId: string
  ) {
    const costEstimate = await this.costEstimateService.getById(costEstimateId);
    if (!costEstimate) {
      throw new NotFoundException(`Cost Estimate ${costEstimateId} not found`);
    }

    const room = (costEstimate.workRequest?.room || []).find(
      (r: any) => r.id === roomId
    );
    if (!room) {
      throw new NotFoundException(
        `Room ${roomId} not found for this cost estimate ${costEstimateId}`
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
