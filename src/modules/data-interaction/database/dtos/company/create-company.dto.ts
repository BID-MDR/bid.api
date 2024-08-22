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
import { CreateAddressDto } from '../address/create-address.dto';
import { CompanyStatusEnum } from '../../enums/company-status.enum';
import { UserEntity } from '../../entitites/user.entity';
import { EmployeeEntity } from '../../entitites/employee.entity';

export class CreateCompanyDto {
    @ApiProperty()
    @Length(1, 200)
    name: string;

    @ApiProperty()
    @Length(1, 70)
    cnpj: string;

    @ApiProperty()
    @Length(1, 70)
    ownerCpf: string;


    @ApiProperty({ enum: CompanyStatusEnum })
    @IsEnum(CompanyStatusEnum)
    status: CompanyStatusEnum;

    @ApiProperty({ type: CreateAddressDto })
    @ValidateNested()
    @Type(() => CreateAddressDto)
    addresses: CreateAddressDto;

    userAdmin: UserEntity
    employees?: EmployeeEntity[]
}
