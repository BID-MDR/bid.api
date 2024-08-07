import { Exclude, Expose, Transform, Type } from "class-transformer";
import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { ResponseEmployeeDto } from "../employee/response-employee.dto";

@Exclude()
export class ResponseEmployeeRoleDto extends BaseResponseDto{
  @ApiProperty()
  @Expose()
  @Type(() => String)
  role: string;
  
  @ApiProperty()
  @Expose()
  description: string;


  @ApiProperty()
  @Expose()
  active: boolean;

  @Expose()
  get status(): string {
    return this.active ? 'ACTIVE' : 'INACTIVE';
  }

  // @ApiProperty({ type: ResponseEmployeeDto})
  // @Expose()
  // @Type(() => ResponseEmployeeDto)
  // @Transform(({ value }) => value ?? undefined)
  // employee: ResponseEmployeeDto;
}