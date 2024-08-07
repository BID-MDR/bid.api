// update-employee-role.dto.ts
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEmployeeRoleDto {
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
