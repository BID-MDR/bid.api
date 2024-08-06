import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class EmployeeRegisterRequestDto {
  @ApiProperty()
  @IsUUID()
  companyId: string;
}