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
exports.WorkRequestService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const work_request_repository_1 = require("../../data-interaction/database/repositories/work-request/work-request.repository");
const demand_repository_1 = require("../../data-interaction/database/repositories/user/demand.repository");
const demand_status_enum_1 = require("../../data-interaction/database/enums/demand-status.enum");
const technical_visit_status_enum_1 = require("../../data-interaction/database/enums/technical-visit-status.enum");
let WorkRequestService = class WorkRequestService extends base_service_1.BaseService {
    workRequestRepository;
    demandRepository;
    constructor(workRequestRepository, demandRepository) {
        super(workRequestRepository);
        this.workRequestRepository = workRequestRepository;
        this.demandRepository = demandRepository;
    }
    async list() {
        return await this.workRequestRepository.findAll();
    }
    async getById(workRequestId) {
        return await this.workRequestRepository.findById(workRequestId);
    }
    async register(data, companyId) {
        const demand = await this.demandRepository.getById(data.demandId);
        if (!demand)
            throw new common_1.BadRequestException("Demanda não encontrada.");
        if (demand.company.id !== companyId)
            throw new common_1.BadRequestException("Não autorizado a acessar essa demanda.");
        data.demand = demand;
        const result = await super.create(data);
        demand.workRequest = result;
        demand.status = demand_status_enum_1.DemandStatusEnum.CADASTRADO_VISTORIA;
        await demand.save();
        return result;
    }
    async update(workRequestId, data) {
        return await super.update(workRequestId, data);
    }
    async updateStatus(workRequestId, status) {
        const workRequest = await this.getById(workRequestId);
        if (!workRequest)
            throw new common_1.BadRequestException("Vistoria não encontrada.");
        workRequest.status = status;
        return await workRequest.save();
    }
    async delete(workRequestId) {
        return await this.workRequestRepository.hardDelete(workRequestId);
    }
    async carryOut(workRequestId, companyId) {
        const workRequest = await this.getById(workRequestId);
        if (!workRequest)
            throw new common_1.BadRequestException("Vistoria não encontrada.");
        workRequest.status = technical_visit_status_enum_1.TechnicalVisitStatusEnum.REALIZADA;
        const demand = await this.demandRepository.getByWorkRequestId(workRequestId);
        if (demand.company.id !== companyId)
            throw new common_1.BadRequestException("Não autorizado a acessar essa demanda.");
        demand.status = demand_status_enum_1.DemandStatusEnum.ESPERANDO_MELHORIA;
        await demand.save();
        return await workRequest.save();
    }
    async cancel(workRequestId) {
        const workRequest = await this.getById(workRequestId);
        workRequest.status = technical_visit_status_enum_1.TechnicalVisitStatusEnum.CANCELADA;
        const demand = await this.demandRepository.getByWorkRequestId(workRequestId);
        demand.status = demand_status_enum_1.DemandStatusEnum.CANCELADO;
        await demand.save();
        return await workRequest.save();
    }
};
exports.WorkRequestService = WorkRequestService;
exports.WorkRequestService = WorkRequestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [work_request_repository_1.WorkRequestRepository,
        demand_repository_1.DemandRepository])
], WorkRequestService);
//# sourceMappingURL=work-request.service.js.map