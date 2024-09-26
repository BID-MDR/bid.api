import { BaseEntity } from "src/core/entities/base.entity";
import { UserEntity } from "./user.entity";
import { WorkRequestEntity } from "./work-request.entity";
import { TechnicalVisitEntity } from "./technical-visit.entity";
import { DemandStatusEnum } from "../enums/demand-status.enum";
import { ConstructionsEntity } from "./constructions.entity";
import { CompanyEntity } from "./company.entity";
export declare class DemandEntity extends BaseEntity {
    document: string;
    state: string;
    city: string;
    zipcode: string;
    complement: string;
    neighborhood: string;
    number: string;
    street: string;
    latitude: string;
    longitude: string;
    status: DemandStatusEnum;
    conclusionDate: Date;
    beneficiary: UserEntity;
    company: CompanyEntity;
    workRequest?: WorkRequestEntity;
    technicalVisit?: TechnicalVisitEntity;
    construction?: ConstructionsEntity;
}
