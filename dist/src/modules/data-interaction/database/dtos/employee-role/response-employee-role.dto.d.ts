import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { ResponseEmployeeDto } from "../employee/response-employee.dto";
export declare class ResponseEmployeeRoleDto extends BaseResponseDto {
    role: string;
    description: string;
    active: boolean;
    employee: ResponseEmployeeDto;
}
