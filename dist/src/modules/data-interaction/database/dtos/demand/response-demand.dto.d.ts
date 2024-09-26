import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { DemandEntity } from "../../entitites/demand.entity";
import { ResponseCompanyDto } from "../company/response-company.dto";
import { ResponseConstructionsDto } from "../constructions/response-constructions.dto";
import { TechnicalVisitResponseDto } from "../technical-visit/reponse-technical-visit.dto";
import { UserResponseDto } from "../user/reponse-user.dto";
import { ResponseWorkRequestDto } from "../work-request/response-work-request.dto";
export declare class ResponseDemandDto extends BaseResponseDto {
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
    status: string;
    beneficiary: UserResponseDto;
    company: ResponseCompanyDto;
    workRequest?: ResponseWorkRequestDto;
    technicalVisit?: TechnicalVisitResponseDto;
    construction?: ResponseConstructionsDto;
    constructor(partial: Partial<DemandEntity>);
}
