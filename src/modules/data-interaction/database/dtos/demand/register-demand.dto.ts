import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';
import { CompanyEntity } from '../../entitites/company.entity';

export class DemandRegisterRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    document: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    zipcode: string;

    @ApiProperty()
    @IsOptional()
    complement: string;

    @ApiProperty()
    neighborhood: string;

    @ApiProperty()
    number: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    latitude: string;

    @ApiProperty()
    longitude: string;

    beneficiary: UserEntity

    company: CompanyEntity;
}
