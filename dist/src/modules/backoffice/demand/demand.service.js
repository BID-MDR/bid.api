"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandBackofficeService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const constructions_stauts_enum_1 = require("../../data-interaction/database/enums/constructions-stauts.enum");
const demand_status_enum_1 = require("../../data-interaction/database/enums/demand-status.enum");
const technical_visit_status_enum_1 = require("../../data-interaction/database/enums/technical-visit-status.enum");
const company_repository_1 = require("../../data-interaction/database/repositories/company/company.repository");
const demand_repository_1 = require("../../data-interaction/database/repositories/user/demand.repository");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
let DemandBackofficeService = class DemandBackofficeService extends base_service_1.BaseService {
    demandRepository;
    companyRepository;
    userRepository;
    constructor(demandRepository, companyRepository, userRepository) {
        super(demandRepository);
        this.demandRepository = demandRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }
    async listByUser(userId) {
        const user = await this.userRepository.getById(userId);
        const companyId = user.employee.company.id || user.companyAdministrator.id;
        return await this.demandRepository.listByUser(userId, companyId);
    }
    async listByCompany(companyId) {
        return await this.demandRepository.listByCompany(companyId);
    }
    async getByMonth(month) {
        return await this.demandRepository.findMonth(month);
    }
    async listForVisit(userId) {
        const user = await this.userRepository.getById(userId);
        const companyId = user.employee.company.id || user.companyAdministrator.id;
        return await this.demandRepository.listForVisit(companyId);
    }
    async listForConstructions(userId) {
        const user = await this.userRepository.getById(userId);
        const companyId = user.employee.company.id || user.companyAdministrator.id;
        return await this.demandRepository.listForConstructions(companyId);
    }
    async listByUserImprovement(userId) {
        const user = await this.userRepository.getById(userId);
        const companyId = user.employee.company.id || user.companyAdministrator.id;
        return await this.demandRepository.listByUserWaitImprove(companyId);
    }
    async getByWorkRequestId(workRequestId) {
        return await this.demandRepository.getByWorkRequestId(workRequestId);
    }
    async updateStatus(id, dto) {
        const demand = await this.demandRepository.findById(id);
        const { status } = dto;
        if (!demand) {
            throw new common_1.BadRequestException("Demanda não encontrada.");
        }
        if (demand.status === demand_status_enum_1.DemandStatusEnum.CONCLUIDO) {
            throw new common_1.BadRequestException("Essa demanda já foi concluída.");
        }
        if (demand.status === demand_status_enum_1.DemandStatusEnum.CANCELADO) {
            throw new common_1.BadRequestException("Essa demanda já foi cancelada.");
        }
        if (status === demand_status_enum_1.DemandStatusEnum.CONCLUIDO) {
            throw new common_1.BadRequestException("Para concluir a demanda, utilize a rota de conclusão.");
        }
        if (status === demand_status_enum_1.DemandStatusEnum.CANCELADO || status === demand_status_enum_1.DemandStatusEnum.RESCISAO) {
            demand.status = status;
            return await demand.save({ reload: true });
        }
        if (!this.checkIsOlderStatus(demand.status, status)) {
            throw new common_1.BadRequestException("Não é possível alterar para um status anterior.");
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
    async register(userId, data) {
        const professional = await this.userRepository.getById(userId);
        if (!professional) {
            throw new common_1.BadRequestException("Professional não encontrado.");
        }
        data.company = await this.companyRepository.findById(professional.employee.company.id);
        if (!data.company) {
            throw new common_1.BadRequestException("Empresa não encontrada.");
        }
        data.beneficiary = await this.userRepository.getByCpf(data.document);
        if (!data.beneficiary) {
            throw new common_1.BadRequestException("Beneficiário não encontrado.");
        }
        return await super.create(data);
    }
    async delete(demandId) {
        return await this.demandRepository.hardDelete(demandId);
    }
    async listByStatus(status) {
        return await this.demandRepository.listByStatus(status);
    }
    async confirmConclusion(id, userId) {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new common_1.BadRequestException("Usuário não encontrado.");
        }
        const demand = await this.demandRepository.findById(id);
        if (!demand) {
            throw new common_1.BadRequestException("Demanda não encontrada.");
        }
        if (demand.status !== demand_status_enum_1.DemandStatusEnum.ESPERANDO_VALIDACAO) {
            throw new common_1.BadRequestException("Essa demanda não está pronta para ser concluída.");
        }
        if (demand.beneficiary.id !== user.id) {
            throw new common_1.BadRequestException("Você não tem permissão para concluir essa demanda.");
        }
        demand.status = demand_status_enum_1.DemandStatusEnum.CONCLUIDO;
        demand.conclusionDate = new Date();
        return await demand.save({ reload: true });
    }
    checkStatusForWorkRequest(demand, status) {
        const isDemandStatusValid = demand.status === demand_status_enum_1.DemandStatusEnum.CADASTRADO_VISTORIA || demand.status === demand_status_enum_1.DemandStatusEnum.RASCUNHO;
        const isWorkRequestPending = demand.workRequest && demand.workRequest.status !== technical_visit_status_enum_1.TechnicalVisitStatusEnum.REALIZADA;
        const isStatusForbiden = [
            demand_status_enum_1.DemandStatusEnum.ESPERANDO_MELHORIA,
            demand_status_enum_1.DemandStatusEnum.EM_ANALISE,
            demand_status_enum_1.DemandStatusEnum.ESPERANDO_VALIDACAO,
            demand_status_enum_1.DemandStatusEnum.ESPERANDO_OBRA,
            demand_status_enum_1.DemandStatusEnum.CONCLUIR_OBRAS,
        ].includes(status);
        if (isDemandStatusValid && isWorkRequestPending && isStatusForbiden) {
            throw new common_1.BadRequestException("A vistoria precisa ser realizada para alterar o status da demanda.");
        }
    }
    checkStatusForImprovement(demand, status) {
        const isDemandStatusValid = demand.status === demand_status_enum_1.DemandStatusEnum.ESPERANDO_MELHORIA || demand.status === demand_status_enum_1.DemandStatusEnum.EM_ANALISE;
        const solutions = demand.workRequest.room.flatMap(room => room.roomSolutions.flatMap(solution => solution.solution));
        const isStatusForbiden = [
            demand_status_enum_1.DemandStatusEnum.ESPERANDO_VALIDACAO,
            demand_status_enum_1.DemandStatusEnum.ESPERANDO_OBRA,
            demand_status_enum_1.DemandStatusEnum.CONCLUIR_OBRAS,
        ].includes(status);
        if (isDemandStatusValid && solutions.length === 0 && isStatusForbiden) {
            throw new common_1.BadRequestException("A melhoria precisa ser informada para alterar o status da demanda.");
        }
    }
    checkStatusForConstruction(demand, status) {
        const isDemandStatusValid = demand.status === demand_status_enum_1.DemandStatusEnum.ESPERANDO_OBRA ||
            demand.status === demand_status_enum_1.DemandStatusEnum.ESPERANDO_VALIDACAO ||
            demand.status === demand_status_enum_1.DemandStatusEnum.CONCLUIR_OBRAS;
        const isConstructionPending = demand.construction && demand.construction.status !== constructions_stauts_enum_1.ConstructionsStatusEnum.CONCLUIDA;
        const isStatusForbiden = [demand_status_enum_1.DemandStatusEnum.ESPERANDO_VALIDACAO].includes(status);
        if (isDemandStatusValid && isConstructionPending && isStatusForbiden) {
            throw new common_1.BadRequestException("A melhoria precisa ser validada para alterar o status da demanda.");
        }
    }
    checkIsOlderStatus(status, newStatus) {
        const statusOrder = [
            demand_status_enum_1.DemandStatusEnum.RASCUNHO,
            demand_status_enum_1.DemandStatusEnum.CADASTRADO_VISTORIA,
            demand_status_enum_1.DemandStatusEnum.ESPERANDO_MELHORIA,
            demand_status_enum_1.DemandStatusEnum.EM_ANALISE,
            demand_status_enum_1.DemandStatusEnum.ESPERANDO_OBRA,
            demand_status_enum_1.DemandStatusEnum.CONCLUIR_OBRAS,
            demand_status_enum_1.DemandStatusEnum.ESPERANDO_VALIDACAO,
        ];
        return statusOrder.indexOf(status) <= statusOrder.indexOf(newStatus);
    }
};
exports.DemandBackofficeService = DemandBackofficeService;
exports.DemandBackofficeService = DemandBackofficeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [demand_repository_1.DemandRepository,
        company_repository_1.CompanyRepository,
        user_repository_1.UserRepository])
], DemandBackofficeService);
//# sourceMappingURL=demand.service.js.map