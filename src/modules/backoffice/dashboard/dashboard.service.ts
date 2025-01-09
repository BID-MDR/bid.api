import { Injectable } from "@nestjs/common";
import { BaseService } from "src/core/services/base.service";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { UserRolesBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user-roles.repository";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { CompanyRepository } from "src/modules/data-interaction/database/repositories/company/company.repository";
import { ConstructionsRepository } from "src/modules/data-interaction/database/repositories/constructions.repository";
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
        private helpRepository: HelpRepository
    ) {
        super(userBackofficeRepository);
    }

    async getCharts(){
        var data = {
            demands:  0,
            vistory:  0,
            construction:  0,
            constructionConcluded:  0

        }

        data.demands = await this.demandRepository.countDemands();
        data.vistory = await this.demandRepository.countVistory();
        data.construction = await this.constructionRepository.count();
        data.constructionConcluded = await this.constructionRepository.CountConcluded();
        return data;
    }

    async getDadosUsuario(month){
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

    async getByEmail(email: string){
        return await this.userBackofficeRepository.getByEmail(email)
    }
}