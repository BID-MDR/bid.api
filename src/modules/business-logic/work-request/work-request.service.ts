import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { CreateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/create-work-request.dto";
import { UpdateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/update-work-request.dto";
import { WorkRequestEntity } from "../../data-interaction/database/entitites/work-request.entity";
import { WorkRequestRepository } from "../../data-interaction/database/repositories/work-request/work-request.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { DemandStatusEnum } from "../../data-interaction/database/enums/demand-status.enum";
import { TechnicalVisitStatusEnum } from "src/modules/data-interaction/database/enums/technical-visit-status.enum";
import { SustainabilityItensRequestDto } from "src/modules/data-interaction/database/dtos/work-request/sustainability-itens-request.dto";
import { SustainabilityItensRepository } from "src/modules/data-interaction/database/repositories/work-request/sustainability-itens.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
import { StorageFacade } from "src/modules/data-interaction/facade/apis/storage/storage.facade";
import { TechnicalVisitRepository } from "src/modules/data-interaction/database/repositories/technical-visit.repository";
import { CostEstimateRepository } from "src/modules/data-interaction/database/repositories/costEstimate/costEstimate.repository";
import { CostEstimateService } from "../cost-estimate/costEstimate.service";
import { NotificationMessageService } from "../notification-msg/notification-message.service";

@Injectable()
export class WorkRequestService extends BaseService<
  WorkRequestEntity,
  CreateWorkRequestDto,
  UpdateWorkRequestDto
> {
  constructor(
    private workRequestRepository: WorkRequestRepository,
    private demandRepository: DemandRepository,
    private tecVisitRepository: TechnicalVisitRepository,
    private userRepository: UserRepository,
    private readonly notificationMsgService: NotificationMessageService,
    private costEstimateRepo: CostEstimateService,
    private sustainabilityItensRepository: SustainabilityItensRepository,
    private readonly storageFacade: StorageFacade
  ) {
    super(workRequestRepository);
  }

  async list() {
    return await this.workRequestRepository.findAll();
  }

  async getById(workRequestId: string) {
    return await this.workRequestRepository.findById2(workRequestId);
  }

  async getByUser(userId: string) {
    return await this.workRequestRepository.getByUserId(userId);
  }

  async register(data: CreateWorkRequestDto, companyId: string) {
    console.log("data", data);
    const demand = await this.demandRepository.getById(data.demandId);

    if (demand.company && demand.company.id !== companyId)
      throw new BadRequestException("Não autorizado a acessar essa demanda.");

    data.demand = demand;

    const result = await super.create(data);
    const msgDto = {
      content: `Vistoria realizada. Siga para a fase de projeto de melhoria`,
    };

    const msgProfessionalDto = {
      content: `Vistoria realizada. Siga para a fase de projeto de melhoria`,
    };
    await this.notificationMsgService.register(data.beneficiary.id, msgDto);

    const professionalId = demand.technicalVisit?.professional?.id;
    if (professionalId) {
      await this.notificationMsgService.register(
        professionalId,
        msgProfessionalDto
      );
    }

    demand.workRequest = result;
    demand.status = DemandStatusEnum.ESPERANDO_MELHORIA;

    await demand.save();

    return result;
  }

  async registerBenefficiary(data: CreateWorkRequestDto, userId: string) {
    data.pictures = data.pictures || [];
    data.beneficiary = await this.userRepository.getById(userId);

    if (data.selectedFiles) {
      const uploadedFiles = await Promise.all(
        data.selectedFiles.map(async (picture) => {
          const imageUrl = await this.storageFacade.uploadMedia(
            picture.mimeType,
            picture.fileName,
            picture.data
          );
          data.pictures.push(imageUrl);
        })
      );
    }

    const result = await super.create(data);

    return result;
  }

  async update(
    workRequestId: string,
    data: UpdateWorkRequestDto,
    tecvisitId?: string,
    userId?: string
  ) {
    if (data.selectedFiles) {
      await Promise.all(
        data.selectedFiles.map(async (picture) => {
          const imageUrl = await this.storageFacade.uploadMedia(
            picture.mimeType,
            picture.fileName,
            picture.data
          );
          if (!data.pictures) {
            data.pictures = [];
          }
          data.pictures.push(imageUrl);
        })
      );
    }
    const wkRequest = await this.workRequestRepository.updateAll(
      workRequestId,
      data
    );
    if (tecvisitId) {
      await this.tecVisitRepository.updateStatusToFinishById(tecvisitId);

      const professional = await this.userRepository.getById(userId);
      if (!professional)
        throw new BadRequestException("Profissional não ecnotnrado!");
      const costEstimate = await this.costEstimateRepo.create({
        workRequest: wkRequest,
        professional: professional,
      });
    }
    return wkRequest;
  }

  async updateStatus(workRequestId: string, status: TechnicalVisitStatusEnum) {
    const workRequest = await this.getById(workRequestId);

    if (!workRequest) throw new BadRequestException("Vistoria não encontrada.");

    workRequest.status = status;

    return await workRequest.save();
  }

  async delete(workRequestId: string) {
    return await this.workRequestRepository.hardDelete(workRequestId);
  }

  async carryOut(workRequestId: string, companyId: string) {
    const workRequest = await this.getById(workRequestId);

    if (!workRequest) throw new BadRequestException("Vistoria não encontrada.");

    workRequest.status = TechnicalVisitStatusEnum.REALIZADA;

    const demand =
      await this.demandRepository.getByWorkRequestId(workRequestId);

    if (demand.company.id !== companyId)
      throw new BadRequestException("Não autorizado a acessar essa demanda.");

    demand.status = DemandStatusEnum.ESPERANDO_MELHORIA;
    await demand.save();

    return await workRequest.save();
  }

  async cancel(workRequestId: string) {
    const workRequest = await this.getById(workRequestId);

    workRequest.status = TechnicalVisitStatusEnum.CANCELADA;

    const demand =
      await this.demandRepository.getByWorkRequestId(workRequestId);

    demand.status = DemandStatusEnum.CANCELADO;
    await demand.save();

    return await workRequest.save();
  }

  async createSustainabilityItens(
    dto: SustainabilityItensRequestDto,
    companyId: string,
    workRequestId: string
  ) {
    const demand =
      await this.demandRepository.getByWorkRequestId(workRequestId);
    const request = await this.sustainabilityItensRepository.create(dto);
    demand.sustainabilityItens = request;
    demand.status = DemandStatusEnum.CONCLUIDO;
    return await demand.save();
  }

  async findNearbyBeneficiary(userId: string) {
    const professional = await this.userRepository.getById(userId);
    return await this.workRequestRepository.findNearbyBeneficiary(
      Number(professional.address.latitude),
      Number(professional.address.longitude),
      professional.address.maximumDistanceToWorks
    );
  }
}
