import { ApiExtraModels, ApiProperty, OmitType } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { BaseResponseDto } from "../../../../../core/dtos/crud/base-response.dto";
import { AddressResponseDto } from "../address/response-address.dto";
import { ResponseDemandDto } from "../demand/response-demand.dto";
import { ResponseEmployeeDto } from "../employee/response-employee.dto";
import { UserResponseDto } from "../user/reponse-user.dto";


@Exclude()
export class ResponseCompanyDto extends BaseResponseDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  cnpj: string;

  @ApiProperty()
  @Expose()
  @Type(() => String)
  status: string;

  @ApiProperty({ type: AddressResponseDto })
  @Expose()
  @Type(() => AddressResponseDto)
  @Transform(({ value }) => value ?? undefined)
  addresses: AddressResponseDto;

  @ApiProperty({ type: UserResponseDto })
  @Expose()
  @Type(() => UserResponseDto)
  @Transform(({ value }) => value ?? undefined)
  userAdmin: UserResponseDto;

  @ApiProperty({ type: ResponseEmployeeDto, isArray: true })
  @Expose()
  @Type(() => ResponseEmployeeDto)
  @Transform(({ value }) => value ?? [])
  employees: ResponseEmployeeDto[];

  // @ApiProperty({ type: ResponseDemandDto, isArray: true })
  // @Expose()
  // @Type(() => ResponseDemandDto) 
  // @Transform(({ value }) => value ?? [])
  // demands: ResponseDemandDto[];
}

