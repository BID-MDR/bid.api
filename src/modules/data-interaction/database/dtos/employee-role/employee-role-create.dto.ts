import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    Length
} from 'class-validator';
import { EmployeeEntity } from '../../entitites/employee.entity';
import { EmployeeRoleEnum } from '../../enums/employee-role.enum';

export class CreateEmployeeRoleDto {
    @ApiProperty()
    @Length(1, 70)
    description: string;

    @ApiProperty({ enum: EmployeeRoleEnum })
    @IsEnum(EmployeeRoleEnum)
    role: EmployeeRoleEnum;

    @ApiProperty()
    employeeId: string;

    active: boolean

    employee: EmployeeEntity
}
