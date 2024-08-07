import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import { Type } from 'class-transformer';
import {
    IsCurrency,
    IsDateString,
    IsDefined,
    IsEmail,
    IsEnum,
    IsNumberString,
    IsOptional,
    IsPhoneNumber,
    Length,
    Max,
    Min,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { EmployeeRoleEnum } from '../../enums/employee-role.enum';
import { EmployeeEntity } from '../../entitites/employee.entity';

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
