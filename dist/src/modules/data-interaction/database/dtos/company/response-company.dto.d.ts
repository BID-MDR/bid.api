import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { AddressResponseDto } from "../address/response-address.dto";
import { ResponseDemandDto } from "../demand/response-demand.dto";
import { ResponseEmployeeDto } from "../employee/response-employee.dto";
import { UserResponseDto } from "../user/reponse-user.dto";
export declare class ResponseCompanyDto extends BaseResponseDto {
    name: string;
    cnpj: string;
    status: string;
    addresses: AddressResponseDto;
    userAdmin: UserResponseDto;
    employees: ResponseEmployeeDto[];
    demands: ResponseDemandDto[];
}
