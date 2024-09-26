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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const base_repository_1 = require("../../../../../core/repositories/base.repository");
const typeorm_2 = require("typeorm");
const demand_entity_1 = require("../../entitites/demand.entity");
const demand_status_enum_1 = require("../../enums/demand-status.enum");
const date_fns_1 = require("date-fns");
let DemandRepository = class DemandRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async getById(_id) {
        return this.repository.findOne({ where: { id: _id }, loadEagerRelations: true });
    }
    async countVistory() {
        return (await this.repository.find({ where: { status: demand_status_enum_1.DemandStatusEnum.ESPERANDO_MELHORIA } })).length;
    }
    async listByStatus(status) {
        return this.repository.find({ where: { status }, loadEagerRelations: true });
    }
    async updateStatus(id, dto) {
        return await this.repository.update(id, { status: dto.status });
    }
    async listByUserWaitImprove(companyId) {
        const query = this.repository
            .createQueryBuilder("demand")
            .innerJoinAndSelect("demand.beneficiary", "beneficiary")
            .innerJoinAndSelect("demand.company", "company")
            .leftJoinAndSelect("demand.workRequest", "workRequest")
            .leftJoinAndSelect("demand.technicalVisit", "technicalVisit")
            .leftJoinAndSelect("workRequest.room", "room")
            .leftJoinAndSelect("workRequest.welfare", "welfare")
            .where("company.id = :companyId", { companyId })
            .andWhere("demand.status IN (:...status)", {
            status: [
                demand_status_enum_1.DemandStatusEnum.ESPERANDO_MELHORIA,
                demand_status_enum_1.DemandStatusEnum.EM_ANALISE,
            ],
        });
        return await query.getMany();
    }
    async listForVisit(companyId = "") {
        const query = this.getDefaultQuery()
            .leftJoinAndSelect("room.roomSolutions", "roomSolutions")
            .where("company.id = :companyId", { companyId })
            .andWhere("demand.status IN (:...statuses)", {
            statuses: [
                demand_status_enum_1.DemandStatusEnum.RASCUNHO,
                demand_status_enum_1.DemandStatusEnum.CADASTRADO_VISTORIA,
                demand_status_enum_1.DemandStatusEnum.ESPERANDO_MELHORIA,
            ],
        })
            .andWhere("roomSolutions.id IS NULL");
        return await query.getMany();
    }
    async listForConstructions(companyId = "") {
        const query = this.getDefaultQuery()
            .where("company.id = :companyId", { companyId })
            .andWhere("demand.status IN (:...status)", {
            status: [
                demand_status_enum_1.DemandStatusEnum.ESPERANDO_OBRA,
                demand_status_enum_1.DemandStatusEnum.ESPERANDO_VALIDACAO,
                demand_status_enum_1.DemandStatusEnum.CONCLUIR_OBRAS,
                demand_status_enum_1.DemandStatusEnum.CONCLUIDO,
            ],
        });
        return await query.getMany();
    }
    async listCanclled(userId) {
        const query = this.getDefaultQuery()
            .andWhere("demand.status = :status", { status: demand_status_enum_1.DemandStatusEnum.CANCELADO });
        return await query.getMany();
    }
    async listByUser(userId, companyId = "") {
        const query = this.getDefaultQuery()
            .where("beneficiary.id = :userId", { userId })
            .orWhere("company.id = :companyId", { companyId });
        return await query.getMany();
    }
    async listByCompany(companyId) {
        const query = this.getDefaultQuery()
            .where("company.id = :companyId", { companyId });
        return await query.getMany();
    }
    async getByWorkRequestId(workRequestId) {
        const query = this.getDefaultQuery().where("workRequest.id = :workRequestId", { workRequestId });
        return await query.getOne();
    }
    async getByConstructionId(constructionId) {
        const query = this.getDefaultQuery().where("constructions.id = :constructionId", { constructionId });
        return await query.getOne();
    }
    async list() {
        const query = this.getDefaultQuery();
        return query.getMany();
    }
    async countList() {
        return this.repository.count();
    }
    async findMonth(month) {
        const now = new Date();
        const pastDate = (0, date_fns_1.addMonths)(now, -month);
        return this.repository.createQueryBuilder('demand')
            .where('demand.createdAt BETWEEN :pastDate AND :now', {
            pastDate: pastDate.toISOString(),
            now: now.toISOString(),
        })
            .getMany();
    }
    getDefaultQuery() {
        return this.repository
            .createQueryBuilder("demand")
            .innerJoinAndSelect("demand.beneficiary", "beneficiary")
            .innerJoinAndSelect("demand.company", "company")
            .leftJoinAndSelect("company.employees", "employees")
            .leftJoinAndSelect("demand.workRequest", "workRequest")
            .leftJoinAndSelect("demand.technicalVisit", "technicalVisit")
            .leftJoinAndSelect("demand.construction", "constructions")
            .leftJoinAndSelect("workRequest.room", "room")
            .leftJoinAndSelect("workRequest.welfare", "welfare")
            .leftJoinAndSelect("room.roomSolutions", "roomSolution")
            .leftJoinAndSelect("roomSolution.picturesAndVideos", "pictures");
    }
};
exports.DemandRepository = DemandRepository;
exports.DemandRepository = DemandRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(demand_entity_1.DemandEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DemandRepository);
//# sourceMappingURL=demand.repository.js.map