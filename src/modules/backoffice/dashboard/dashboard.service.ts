import { Injectable } from "@nestjs/common";
import { BaseService } from "src/core/services/base.service";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { UserRolesBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user-roles.repository";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { CompanyRepository } from "src/modules/data-interaction/database/repositories/company/company.repository";
import { ConstructionsRepository } from "src/modules/data-interaction/database/repositories/constructions.repository";
import { ContractRepository } from "src/modules/data-interaction/database/repositories/contract/contract.repository";
import { CostEstimateRepository } from "src/modules/data-interaction/database/repositories/costEstimate/costEstimate.repository";
import { ImprovementProjectRepository } from "src/modules/data-interaction/database/repositories/improvement-project/improvement-project.repository";
import { RegisterWorkRepository } from "src/modules/data-interaction/database/repositories/registerWork/registerWork.repository";
import { DemandRepository } from "src/modules/data-interaction/database/repositories/user/demand.repository";
import { HelpRepository } from "src/modules/data-interaction/database/repositories/user/help.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";

@Injectable()
export class DashboardService extends BaseService<any, any, any> {
    constructor(
        private userBackofficeRepository: UserBackofficeRepository,
        private userRoleBackofficeRepository: UserRolesBackofficeRepository,
        private userRepository: UserRepository,
        private demandRepository: DemandRepository,
        private companyRepository: CompanyRepository,
        private constructionRepository: ConstructionsRepository,
        private helpRepository: HelpRepository,
        private registerWorkRepository: RegisterWorkRepository,
        private contractRepository: ContractRepository,
        private costEstimateRepository: CostEstimateRepository,
        private improvementProjectRepository: ImprovementProjectRepository,
    ) {
        super(userBackofficeRepository);
    }

    async getCharts() {
        var data = {
            contract: 0,
            costEstimate: 0,
            improvementeProject: 0,
            constructionInProgress: 0,
            constructionConcluded: 0,
        }

        data.contract = await this.contractRepository.countContracts();
        data.costEstimate = await this.costEstimateRepository.countCostEstimates();
        data.improvementeProject = await this.improvementProjectRepository.countImprovementProject();
        data.constructionInProgress = await this.registerWorkRepository.countRegisterWork();
        data.constructionConcluded = await this.registerWorkRepository.countRegisterWorkConcluded();
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

        }

        data.demands = (await this.demandRepository.findMonth(month)).length
        data.beneficiario = (await this.userRepository.findMonth(month)).length
        data.agent = (await this.companyRepository.findMonth(month)).length
        data.constructions = (await this.constructionRepository.findMonth(month)).length
        data.help = (await this.helpRepository.findMonth(month)).length
        data.inconsistency = 0

        return data;
    }

    async getDadosUsuarioMcmv(month) {
        var data = {
            beneficiario: 0,
            agent: 0,
            demands: 0,
            constructions: 0,
            registerWork: 0,
            help: 0,
            inconsistency: 0

        }

        data.demands = (await this.demandRepository.findMonth(month)).length
        data.beneficiario = (await this.userRepository.findMonthMcmv(month)).length
        data.agent = (await this.companyRepository.findMonth(month)).length
        data.constructions = (await this.constructionRepository.findMonthMcmv(month)).length
        data.registerWork = (await this.registerWorkRepository.findMonth(month)).length
        data.help = (await this.helpRepository.findMonthMcmv(month)).length
        data.inconsistency = 0

        return data;
    }

    async getByEmail(email: string) {
        return await this.userBackofficeRepository.getByEmail(email)
    }
}