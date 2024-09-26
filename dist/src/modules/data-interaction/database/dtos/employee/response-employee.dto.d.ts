import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { EmployeeStatusEnum } from "../../enums/employee-status.enum";
import { ResponseCompanyDto } from "../company/response-company.dto";
import { ResponseEmployeeRoleDto } from "../employee-role/response-employee-role.dto";
import { UserResponseDto } from "../user/reponse-user.dto";
export declare class ResponseEmployeeDto extends BaseResponseDto {
    company: ResponseCompanyDto;
    user: UserResponseDto;
    status: EmployeeStatusEnum;
    roles: ResponseEmployeeRoleDto[];
}
