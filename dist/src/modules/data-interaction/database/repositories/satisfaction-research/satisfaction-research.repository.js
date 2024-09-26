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
exports.SatisfactionResearchRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const satisfaction_research_entity_1 = require("../../entitites/satisfaction-research.entity");
const base_repository_1 = require("../../../../../core/repositories/base.repository");
const user_type_enum_1 = require("../../enums/user-type.enum");
const date_fns_1 = require("date-fns");
let SatisfactionResearchRepository = class SatisfactionResearchRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async list() {
        return this.repository.find({
            relations: ['user', 'workRequest'],
        });
    }
    async listBeneficiary() {
        return this.repository.createQueryBuilder('satisfaction_research')
            .leftJoinAndSelect('satisfaction_research.user', 'user')
            .where('user.type = :type', { type: user_type_enum_1.UserTypeEnum.BENEFICIARIO }).getMany();
    }
    async listBeneficiaryMonth(monthsAgo) {
        const now = new Date();
        const pastDate = (0, date_fns_1.addMonths)(now, -monthsAgo);
        return this.repository.createQueryBuilder('satisfaction_research')
            .leftJoinAndSelect('satisfaction_research.user', 'user')
            .where('user.type = :type', { type: user_type_enum_1.UserTypeEnum.BENEFICIARIO })
            .andWhere('satisfaction_research.createdAt BETWEEN :pastDate AND :now', {
            pastDate: pastDate.toISOString(),
            now: now.toISOString(),
        })
            .getMany();
    }
    async listProfessional() {
        return this.repository.createQueryBuilder('satisfaction_research')
            .leftJoinAndSelect('satisfaction_research.user', 'user')
            .where('user.type = :type', { type: user_type_enum_1.UserTypeEnum.PROFISSIONAL }).getMany();
    }
    async listProfessionalMonth(monthsAgo) {
        const now = new Date();
        const pastDate = (0, date_fns_1.addMonths)(now, -monthsAgo);
        return this.repository.createQueryBuilder('satisfaction_research')
            .leftJoinAndSelect('satisfaction_research.user', 'user')
            .where('user.type = :type', { type: user_type_enum_1.UserTypeEnum.PROFISSIONAL })
            .andWhere('satisfaction_research.createdAt BETWEEN :pastDate AND :now', {
            pastDate: pastDate.toISOString(),
            now: now.toISOString(),
        })
            .getMany();
    }
};
exports.SatisfactionResearchRepository = SatisfactionResearchRepository;
exports.SatisfactionResearchRepository = SatisfactionResearchRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(satisfaction_research_entity_1.SatisfactionResearchEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SatisfactionResearchRepository);
//# sourceMappingURL=satisfaction-research.repository.js.map