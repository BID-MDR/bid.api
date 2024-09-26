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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const company_repository_1 = require("../../data-interaction/database/repositories/company/company.repository");
const demand_repository_1 = require("../../data-interaction/database/repositories/user/demand.repository");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
let CompanyService = class CompanyService extends base_service_1.BaseService {
    companyRepository;
    demandRepository;
    userRepository;
    constructor(companyRepository, demandRepository, userRepository) {
        super(companyRepository);
        this.companyRepository = companyRepository;
        this.demandRepository = demandRepository;
        this.userRepository = userRepository;
    }
    async register(dto) {
        const admin = await this.userRepository.getByCpf(dto.ownerCpf);
        if (!admin)
            throw new common_1.BadRequestException("Admin não encontrado(a).");
        dto.userAdmin = admin;
        return await this.companyRepository.create(dto);
    }
    async list() {
        return await this.companyRepository.findAll();
    }
    async getByOwner(id) {
        return await this.companyRepository.getByOwner(id);
    }
    async getByEmployee(id) {
        return await this.companyRepository.getByEmployee(id);
    }
    async delete(companyId) {
        return await this.companyRepository.hardDelete(companyId);
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [company_repository_1.CompanyRepository,
        demand_repository_1.DemandRepository,
        user_repository_1.UserRepository])
], CompanyService);
//# sourceMappingURL=company.service.js.map