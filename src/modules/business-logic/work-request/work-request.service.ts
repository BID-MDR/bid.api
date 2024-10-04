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

@Injectable()
export class WorkRequestService extends BaseService<WorkRequestEntity, CreateWorkRequestDto, UpdateWorkRequestDto> {
  constructor(
    private workRequestRepository: WorkRequestRepository,
    private demandRepository: DemandRepository,
    private sustainabilityItensRepository: SustainabilityItensRepository
  ) {
    super(workRequestRepository);
  }

  async list() {
    return await this.workRequestRepository.findAll();
  }

  async getById(workRequestId: string) {
    return await this.workRequestRepository.findById(workRequestId);
  }

  async register(data: CreateWorkRequestDto, companyId: string) {
    const demand = await this.demandRepository.getById(data.demandId);

    if (!demand) throw new BadRequestException("Demanda não encontrada.");

    if (demand.company.id !== companyId) throw new BadRequestException("Não autorizado a acessar essa demanda.");

    data.demand = demand;

    const result = await super.create(data);

    demand.workRequest = result;
    demand.status = DemandStatusEnum.CADASTRADO_VISTORIA;

    await demand.save();

    return result;
  }

  async update(workRequestId: string, data: UpdateWorkRequestDto) {
    return await super.update(workRequestId, data);
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

    const demand = await this.demandRepository.getByWorkRequestId(workRequestId);

    if (demand.company.id !== companyId) throw new BadRequestException("Não autorizado a acessar essa demanda.");

    demand.status = DemandStatusEnum.ESPERANDO_MELHORIA;
    await demand.save();

    return await workRequest.save();
  }

  async cancel(workRequestId: string) {
    const workRequest = await this.getById(workRequestId);

    workRequest.status = TechnicalVisitStatusEnum.CANCELADA;

    const demand = await this.demandRepository.getByWorkRequestId(workRequestId);

    demand.status = DemandStatusEnum.CANCELADO;
    await demand.save();

    return await workRequest.save();
  }

  async createSustainabilityItens(dto: SustainabilityItensRequestDto, companyId: string, workRequestId: string) {
    const demand = await this.demandRepository.getByWorkRequestId(workRequestId);
    if (demand.company.id !== companyId) throw new BadRequestException("Não autorizado a acessar essa demanda.");
    const request = await this.sustainabilityItensRepository.create(dto);
    demand.sustainabilityItens = request;
    return await demand.save();
  }
}
