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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const user_roles_repository_1 = require("../../data-interaction/database/repositories/backoffice/user/user-roles.repository");
const user_repository_1 = require("../../data-interaction/database/repositories/backoffice/user/user.repository");
const company_repository_1 = require("../../data-interaction/database/repositories/company/company.repository");
const constructions_repository_1 = require("../../data-interaction/database/repositories/constructions.repository");
const demand_repository_1 = require("../../data-interaction/database/repositories/user/demand.repository");
const help_repository_1 = require("../../data-interaction/database/repositories/user/help.repository");
const user_repository_2 = require("../../data-interaction/database/repositories/user/user.repository");
let DashboardService = class DashboardService extends base_service_1.BaseService {
    userBackofficeRepository;
    userRoleBackofficeRepository;
    userRepository;
    demandRepository;
    companyRepository;
    constructionRepository;
    helpRepository;
    constructor(userBackofficeRepository, userRoleBackofficeRepository, userRepository, demandRepository, companyRepository, constructionRepository, helpRepository) {
        super(userBackofficeRepository);
        this.userBackofficeRepository = userBackofficeRepository;
        this.userRoleBackofficeRepository = userRoleBackofficeRepository;
        this.userRepository = userRepository;
        this.demandRepository = demandRepository;
        this.companyRepository = companyRepository;
        this.constructionRepository = constructionRepository;
        this.helpRepository = helpRepository;
    }
    async getCharts() {
        var data = {
            demands: 0,
            vistory: 0,
            construction: 0,
            constructionConcluded: 0
        };
        data.demands = await this.demandRepository.count();
        data.vistory = await this.demandRepository.countVistory();
        data.construction = await this.constructionRepository.count();
        data.constructionConcluded = await this.constructionRepository.CountConcluded();
        return data;
    }
    async getDadosUsuario(month) {
        var data = {
            beneficiario: 0,
            agent: 0,
            demands: 0,
            constructions: 0,
            help: 0,
            inconsistency: 0
        };
        data.demands = (await this.demandRepository.findMonth(month)).length;
        data.beneficiario = (await this.userRepository.findMonth(month)).length;
        data.agent = (await this.companyRepository.findMonth(month)).length;
        data.constructions = (await this.constructionRepository.findMonth(month)).length;
        data.help = (await this.helpRepository.findMonth(month)).length;
        data.inconsistency = 0;
        return data;
    }
    async getByEmail(email) {
        return await this.userBackofficeRepository.getByEmail(email);
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserBackofficeRepository,
        user_roles_repository_1.UserRolesBackofficeRepository,
        user_repository_2.UserRepository,
        demand_repository_1.DemandRepository,
        company_repository_1.CompanyRepository,
        constructions_repository_1.ConstructionsRepository,
        help_repository_1.HelpRepository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map