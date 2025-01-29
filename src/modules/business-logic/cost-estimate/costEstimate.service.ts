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
import { CostEstimateStatusEnum } from "src/modules/data-interaction/database/enums/cost-estimate-status.enum";
import { NotificationMessageService } from "../notification-msg/notification-message.service";
import { NotificationMessageRegisterRequestDto } from "src/modules/data-interaction/database/dtos/notificationMsg/register-notification-message.dto";
import { InterventionRepository } from "src/modules/data-interaction/database/repositories/intervention/intervention.repository";
import { CreateInterventionRequestDto } from "src/modules/data-interaction/database/dtos/intervention/intervention-request.dto";

@Injectable()
export class CostEstimateService extends BaseService<CostEstimateEntity, any, any> {
  constructor(
    private repository: CostEstimateRepository,
    private roomRepo: RoomRepository,
    private workRequestRepo: WorkRequestRepository,
    private userRepo: UserRepository,
    private notificationMsgService: NotificationMessageService,
    private interventionRepo: InterventionRepository

  ) {
    super(repository);
  }

  async list() {
    return await this.repository.find();
  }


  async listProfessional(_id:any) {
    return await this.repository.findByProfessional(_id);
  }
  async listByBeneficary(_id: string) {
    return await this.repository.findByBeneficary(_id)
  }

  async getById(workRequestId: string) {
    return await this.repository.findById(workRequestId);
  }


  async register(data: CreateCostEstimateRequestDto) {
    const workRequest = await this.workRequestRepo.findByIdAndBringBeneficiary(data.workRequestId);
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


    const costEstimate = await this.repository.create(data);
    const dto:NotificationMessageRegisterRequestDto = {
      content: 'Visita técnica realizada.Siga para a fase de estimativa'
    }
    if(workRequest.beneficiary) {
  
      await this.notificationMsgService.register(workRequest.beneficiary.id, dto)

    }
    await this.notificationMsgService.register(professional.id, dto)


    return costEstimate
}


 

async update(costEstimateId: string, data: CreateCostEstimateRequestDto) {
  const costEstimate = await this.repository.getById(costEstimateId);
  if (!costEstimate) {
      throw new NotFoundException('CostEstimate not found!');
  }

  if (data.workRequestId) {
      const workRequest = await this.workRequestRepo.findByIdAndBringBeneficiary(data.workRequestId);
      if (!workRequest) {
          throw new NotFoundException('WorkRequest not found!');
      }
      costEstimate.workRequest = workRequest;
      if(workRequest.beneficiary) {
        const msg = {
          content: 'Estimativa de custo recebida'
        }
        await this.notificationMsgService.register(workRequest.beneficiary.id, msg)

      }
  }

  if (data.professionalId) {
      const professional = await this.userRepo.findById(data.professionalId);
      if (!professional) {
          throw new NotFoundException('Professional not found!');
      }
      costEstimate.professional = professional;
      const msg = {
        content: 'Estimativa de custo enviada com sucesso'
      }
      await this.notificationMsgService.register(professional.id, msg)

  }

  if (data.roomId && data.roomId.length > 0) {
      const roomPromises = data.roomId.map(async (roomId: string) => {
          const roomFound = await this.roomRepo.findById(roomId);
          if (!roomFound) {
              throw new NotFoundException(`Room with ID ${roomId} not found!`);
          }
          return roomFound;
      });

      const roomsResolved = await Promise.all(roomPromises);
      costEstimate.rooms = roomsResolved;
  }

  if (data.total) costEstimate.total = data.total;
 
  if (data.estimateDate) costEstimate.estimateDate = data.estimateDate;
  costEstimate.type = CostEstimateStatusEnum.AWAITING_APPROVAL
  return costEstimate.save()
}

  async requestAdjust(costEstimateId: string, data: CostEstimateAdjustRequestDto) {
    const costEstimate = await this.repository.findById(costEstimateId)
    if (!costEstimate) throw new NotFoundException('Cost Estimate not found!')
    const workRequest = await this.workRequestRepo.findByIdAndBringBeneficiary(data.workRequestId)
    if(!workRequest) throw new NotFoundException('Workrequest not found!')
    if(!workRequest.beneficiary) throw new NotFoundException('Beneficary not found!')
    await this.repository.requestAdjust(costEstimateId, data.adjustDetails)
    const msg = {
      content: 'Ajuste solicitado na estimativa de custo com sucesso'
    }
    await this.notificationMsgService.register(workRequest.beneficiary.id, msg)
    if(costEstimate.professional) {
      await this.notificationMsgService.register(costEstimate.professional.id, msg)

    }

  }

  async updateStatus(costEstimateId: string, data: CostEstimateAproveReproveRequestDto) {
    const costEstimate = await this.repository.findById(costEstimateId)
    if (data.type === CostEstimateStatusEnum.APPROVED_ESTIMATION) {
      if(!data.interventionId) throw new NotFoundException('Intervention ID is missing!')
      const intervention = await this.interventionRepo.findById(data.interventionId)
      if(!intervention) throw new NotFoundException('InterventionNotfound')
      const dto: CreateInterventionRequestDto ={
        room: intervention.room,
        value: intervention.value,
        toDo: intervention.toDo,
        step: 'INTERVENTION_HISTORY',
    }
    await this.interventionRepo.create(dto)

    }
    if (!costEstimate) throw new NotFoundException('Cost Estimate not found!')
      await this.repository.updateStatus(costEstimateId, data)
  }

  async delete(costEstimateId: string) {
    return await this.repository.hardDelete(costEstimateId);
  }


}
