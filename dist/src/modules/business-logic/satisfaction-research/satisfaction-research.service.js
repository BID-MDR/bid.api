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
exports.SatisfactionResearchService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
const satisfaction_research_repository_1 = require("../../data-interaction/database/repositories/satisfaction-research/satisfaction-research.repository");
const work_request_repository_1 = require("../../data-interaction/database/repositories/work-request/work-request.repository");
let SatisfactionResearchService = class SatisfactionResearchService extends base_service_1.BaseService {
    workRequestRepository;
    satisfactionResearchRepository;
    userRepository;
    constructor(workRequestRepository, satisfactionResearchRepository, userRepository) {
        super(satisfactionResearchRepository);
        this.workRequestRepository = workRequestRepository;
        this.satisfactionResearchRepository = satisfactionResearchRepository;
        this.userRepository = userRepository;
    }
    async register(data, userId, workRequestId) {
        const user = await this.userRepository.getById(userId);
        if (!user)
            throw new common_1.BadRequestException("Usuário não encontrado(a).");
        const workRequest = await this.workRequestRepository.findById(workRequestId);
        if (!workRequest)
            throw new common_1.BadRequestException("Obra não encontrada.");
        data.user = user;
        data.workRequest = workRequest;
        return await this.satisfactionResearchRepository.create(data);
    }
    async list() {
        return await this.satisfactionResearchRepository.findAll();
    }
    async hardDelete(id) {
        return await this.satisfactionResearchRepository.hardDelete(id);
    }
};
exports.SatisfactionResearchService = SatisfactionResearchService;
exports.SatisfactionResearchService = SatisfactionResearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [work_request_repository_1.WorkRequestRepository,
        satisfaction_research_repository_1.SatisfactionResearchRepository,
        user_repository_1.UserRepository])
], SatisfactionResearchService);
//# sourceMappingURL=satisfaction-research.service.js.map