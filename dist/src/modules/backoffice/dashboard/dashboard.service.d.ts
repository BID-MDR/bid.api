import { BaseService } from "src/core/services/base.service";
import { UserRolesBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user-roles.repository";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { CompanyRepository } from "src/modules/data-interaction/database/repositories/company/company.repository";
import { ConstructionsRepository } from "src/modules/data-interaction/database/repositories/constructions.repository";
import { DemandRepository } from "src/modules/data-interaction/database/repositories/user/demand.repository";
import { HelpRepository } from "src/modules/data-interaction/database/repositories/user/help.repository";
import { UserRepository } from "src/modules/data-interaction/database/repositories/user/user.repository";
export declare class DashboardService extends BaseService<any, any, any> {
    private userBackofficeRepository;
    private userRoleBackofficeRepository;
    private userRepository;
    private demandRepository;
    private companyRepository;
    private constructionRepository;
    private helpRepository;
    constructor(userBackofficeRepository: UserBackofficeRepository, userRoleBackofficeRepository: UserRolesBackofficeRepository, userRepository: UserRepository, demandRepository: DemandRepository, companyRepository: CompanyRepository, constructionRepository: ConstructionsRepository, helpRepository: HelpRepository);
    getCharts(): Promise<{
        demands: number;
        vistory: number;
        construction: number;
        constructionConcluded: number;
    }>;
    getDadosUsuario(month: any): Promise<{
        beneficiario: number;
        agent: number;
        demands: number;
        constructions: number;
        help: number;
        inconsistency: number;
    }>;
    getByEmail(email: string): Promise<import("../../data-interaction/database/entitites/user-backoffice.entity").UserBackofficeEntity>;
}
