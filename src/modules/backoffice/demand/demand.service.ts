import { Injectable, BadRequestException } from "@nestjs/common";
import { BaseService } from "src/core/services/base.service";
import { DemandRegisterRequestDto } from "src/modules/data-interaction/database/dtos/demand/register-demand.dto";
import { StatusDemandDto } from "src/modules/data-interaction/database/dtos/demand/update-status-demand.dto";
import { DemandEntity } from "src/modules/data-interaction/database/entitites/demand.entity";
import { ConstructionsStatusEnum } from "src/modules/data-interaction/database/enums/constructions-stauts.enum";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { TechnicalVisitStatusEnum } from "src/modules/data-interaction/database/enums/technical-visit-status.enum";
import { CompanyRepository } from "src/modules/data-interaction/database/repositories/company/company.repository";
import { DemandRepository } from "src/modules/data-interaction/database/repositories/user/demand.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";

@Injectable()
export class DemandBackofficeService extends BaseService<DemandEntity, DemandRegisterRequestDto, DemandRegisterRequestDto> {
  constructor(
    private demandRepository: DemandRepository,
    private companyRepository: CompanyRepository,
    private readonly userRepository: UserRepository
  ) {
    super(demandRepository);
  }

  async listByUser(userId: string) {
    const user = await this.userRepository.getById(userId);
    const companyId = user.employee.company.id || user.companyAdministrator.id;
    return await this.demandRepository.listByUser(userId, companyId);
  }

  async listByCompany(companyId: string) {
    return await this.demandRepository.listByCompany(companyId);
  }

  async getByMonth(month: number){
    return await this.demandRepository.findMonth(month);
  }

  async countSustainability(document: string){
    return await this.demandRepository.countSustainabilityItems(document);
  }

  async countConstructions(document: string){
    return await this.demandRepository.countConstructions(document);
  }

  async countConstructionsCompleted(document: string){
    return await this.demandRepository.countConstructionsCompleted(document);
  }

  async countTechnicalVisit(document: string){
    return await this.demandRepository.countTechnicalVisit(document);
  }

  async listForVisit(userId: string) {
    const user = await this.userRepository.getById(userId);
    const companyId = user.employee.company.id || user.companyAdministrator.id;
    return await this.demandRepository.listForVisit(companyId);
  }

  async listForConstructions(userId: string) {
    const user = await this.userRepository.getById(userId);
    const companyId = user.employee.company.id || user.companyAdministrator.id;
    return await this.demandRepository.listForConstructions(companyId);
  }

  async listByUserImprovement(userId: string) {
    const user = await this.userRepository.getById(userId);
    const companyId = user.employee.company.id || user.companyAdministrator.id;
    return await this.demandRepository.listByUserWaitImprove(companyId);
  }

  async getByWorkRequestId(workRequestId: string) {
    return await this.demandRepository.getByWorkRequestId(workRequestId);
  }

  async updateStatus(id: string, dto: StatusDemandDto) {
    const demand = await this.demandRepository.findById(id);

    const { status } = dto;

    if (!demand) {
      throw new BadRequestException("Demanda não encontrada.");
    }

    if (demand.status === DemandStatusEnum.CONCLUIDO) {
      throw new BadRequestException("Essa demanda já foi concluída.");
    }

    if (demand.status === DemandStatusEnum.CANCELADO) {
      throw new BadRequestException("Essa demanda já foi cancelada.");
    }

    if (status === DemandStatusEnum.CONCLUIDO) {
      throw new BadRequestException("Para concluir a demanda, utilize a rota de conclusão.");
    }

    if (status === DemandStatusEnum.CANCELADO || status === DemandStatusEnum.RESCISAO) {
      demand.status = status;
      return await demand.save({ reload: true });
    }

    if (!this.checkIsOlderStatus(demand.status, status)) {
      throw new BadRequestException("Não é possível alterar para um status anterior.");
    }

    this.checkStatusForWorkRequest(demand, status);
    this.checkStatusForImprovement(demand, status);
    this.checkStatusForConstruction(demand, status);

    demand.status = status;
    return await demand.save({ reload: true });
  }

  async list() {
    return await this.demandRepository.list();
  }

  async register(userId: string, data: DemandRegisterRequestDto) {
    data.document.replace(/\D/g, '');
    const professional = await this.userRepository.getById(userId);

    if (!professional) {
      throw new BadRequestException("Professional não encontrado.");
    }

    data.company = await this.companyRepository.findById(professional.employee.company.id);

    if (!data.company) {
      throw new BadRequestException("Empresa não encontrada.");
    }

    data.beneficiary = await this.userRepository.getByCpf(data.document);

    if (!data.beneficiary) {
      throw new BadRequestException("Beneficiário não encontrado.");
    }

    return await super.create(data);
  }

  async delete(demandId: string) {
    return await this.demandRepository.hardDelete(demandId);
  }

  async listByStatus(status: DemandStatusEnum) {
    return await this.demandRepository.listByStatus(status);
  }

  async confirmConclusion(id: string, userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new BadRequestException("Usuário não encontrado.");
    }

    const demand = await this.demandRepository.findById(id);

    if (!demand) {
      throw new BadRequestException("Demanda não encontrada.");
    }

    if (demand.status !== DemandStatusEnum.ESPERANDO_VALIDACAO) {
      throw new BadRequestException("Essa demanda não está pronta para ser concluída.");
    }

    if (demand.beneficiary.id !== user.id) {
      throw new BadRequestException("Você não tem permissão para concluir essa demanda.");
    }

    demand.status = DemandStatusEnum.CONCLUIDO;
    demand.conclusionDate = new Date();
    return await demand.save({ reload: true });
  }

  private checkStatusForWorkRequest(demand: DemandEntity, status: DemandStatusEnum) {
    const isDemandStatusValid =
      demand.status === DemandStatusEnum.CADASTRADO_VISTORIA || demand.status === DemandStatusEnum.RASCUNHO;

    const isWorkRequestPending = demand.workRequest && demand.workRequest.status !== TechnicalVisitStatusEnum.REALIZADA;

    const isStatusForbiden = [
      DemandStatusEnum.ESPERANDO_MELHORIA,
      DemandStatusEnum.EM_ANALISE,
      DemandStatusEnum.ESPERANDO_VALIDACAO,
      DemandStatusEnum.ESPERANDO_OBRA,
      DemandStatusEnum.CONCLUIR_OBRAS,
    ].includes(status);

    if (isDemandStatusValid && isWorkRequestPending && isStatusForbiden) {
      throw new BadRequestException("A vistoria precisa ser realizada para alterar o status da demanda.");
    }
  }

  private checkStatusForImprovement(demand: DemandEntity, status: DemandStatusEnum) {
    const isDemandStatusValid =
      demand.status === DemandStatusEnum.ESPERANDO_MELHORIA || demand.status === DemandStatusEnum.EM_ANALISE;

    const solutions = demand.workRequest.room.flatMap(room =>
      room.roomSolutions.flatMap(solution => solution.solution)
    );

    const isStatusForbiden = [
      DemandStatusEnum.ESPERANDO_VALIDACAO,
      DemandStatusEnum.ESPERANDO_OBRA,
      DemandStatusEnum.CONCLUIR_OBRAS,
    ].includes(status);

    if (isDemandStatusValid && solutions.length === 0 && isStatusForbiden) {
      throw new BadRequestException("A melhoria precisa ser informada para alterar o status da demanda.");
    }
  }

  private checkStatusForConstruction(demand: DemandEntity, status: DemandStatusEnum) {
    const isDemandStatusValid =
      demand.status === DemandStatusEnum.ESPERANDO_OBRA ||
      demand.status === DemandStatusEnum.ESPERANDO_VALIDACAO ||
      demand.status === DemandStatusEnum.CONCLUIR_OBRAS;

    const isConstructionPending =
      demand.construction && demand.construction.status !== ConstructionsStatusEnum.CONCLUIDA;

    const isStatusForbiden = [DemandStatusEnum.ESPERANDO_VALIDACAO].includes(status);

    if (isDemandStatusValid && isConstructionPending && isStatusForbiden) {
      throw new BadRequestException("A melhoria precisa ser validada para alterar o status da demanda.");
    }
  }

  private checkIsOlderStatus(status: DemandStatusEnum, newStatus: DemandStatusEnum) {
    const statusOrder = [
      DemandStatusEnum.RASCUNHO,
      DemandStatusEnum.CADASTRADO_VISTORIA,
      DemandStatusEnum.ESPERANDO_MELHORIA,
      DemandStatusEnum.EM_ANALISE,
      DemandStatusEnum.ESPERANDO_OBRA,
      DemandStatusEnum.CONCLUIR_OBRAS,
      DemandStatusEnum.ESPERANDO_VALIDACAO,
    ];

    return statusOrder.indexOf(status) <= statusOrder.indexOf(newStatus);
  }
}