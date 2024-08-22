import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { UserEntity } from "../../entitites/user.entity";
import { EmployeeRoleEntity } from "../../entitites/employee-role.entity";

export class EmployeeRegisterRequestDto {
  @ApiProperty()
  @IsUUID()
  companyId: string;

  roles:EmployeeRoleEntity[]
  user: UserEntity
}