import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { EmployeeStatusEnum } from "../../enums/employee-status.enum";
import { ResponseCompanyDto } from "../company/response-company.dto";
import { ResponseEmployeeRoleDto } from "../employee-role/response-employee-role.dto";
import { UserResponseDto } from "../user/reponse-user.dto";

@Exclude()
export class ResponseEmployeeDto extends BaseResponseDto{
  // @ApiProperty({ type: ResponseCompanyDto, nullable:false})
  @Expose()
  @Type(() => ResponseCompanyDto)
  @Transform(({ value }) => value ?? undefined)
  company: ResponseCompanyDto;

  @ApiProperty({ type: UserResponseDto})
  @Expose()
  @Type(() => UserResponseDto)
  @Transform(({ value }) => value ?? undefined)
  user: UserResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  status: EmployeeStatusEnum;

  @Expose()
  @Type(() => ResponseEmployeeRoleDto)
  @Transform(({ value }) => value ?? [])
  roles: ResponseEmployeeRoleDto[];
}