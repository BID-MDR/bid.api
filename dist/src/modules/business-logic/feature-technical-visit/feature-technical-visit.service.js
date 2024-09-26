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
exports.FeatureTechnicalVisitService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const technical_visit_repository_1 = require("../../data-interaction/database/repositories/technical-visit.repository");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
let FeatureTechnicalVisitService = class FeatureTechnicalVisitService extends base_service_1.BaseService {
    technicalVisitRepository;
    userRepository;
    constructor(technicalVisitRepository, userRepository) {
        super(technicalVisitRepository);
        this.technicalVisitRepository = technicalVisitRepository;
        this.userRepository = userRepository;
    }
    async getByProfessional(professionalId) {
        return await this.technicalVisitRepository.getByProfessional(professionalId);
    }
    async schedule(dto) {
        const beneficiary = await this.userRepository.getById(dto.beneficiaryId);
        dto.beneficiary = beneficiary;
        const professional = await this.userRepository.getById(dto.professionalId);
        dto.professional = professional;
        return await this.technicalVisitRepository.create(dto);
    }
};
exports.FeatureTechnicalVisitService = FeatureTechnicalVisitService;
exports.FeatureTechnicalVisitService = FeatureTechnicalVisitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [technical_visit_repository_1.TechnicalVisitRepository,
        user_repository_1.UserRepository])
], FeatureTechnicalVisitService);
//# sourceMappingURL=feature-technical-visit.service.js.map