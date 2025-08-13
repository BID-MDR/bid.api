import { ApiProperty } from '@nestjs/swagger';
import { IsCEP } from 'brazilian-class-validator';
import { IsLatitude, IsLongitude, IsNumberString, IsOptional, IsPositive, Length } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({ example: 'SP' })
    @Length(2, 2)
    state: string;

    @ApiProperty({ required: false })
    @IsOptional()
    nickname?: string;

    @ApiProperty()
    @Length(1, 50)
    city: string;

    @ApiProperty({ example: '00000-000' })
    @IsCEP()
    zipcode: string;

    @ApiProperty()
    @IsOptional()
    complement: string;

    @ApiProperty()
    @Length(1, 50)
    neighborhood: string;

    @ApiProperty()
    @Length(1, 10)
    number: string;

    @ApiProperty()
    @Length(1, 100)
    street: string;

    @ApiProperty({ example: '-23.000000' })
    @IsLatitude()
    latitude: string;

    @ApiProperty({ example: '-46.000000' })
    @IsLongitude()
    longitude: string;

    @ApiProperty({ required: false })
    @IsPositive()
    @IsOptional()
    maximumDistanceToWorks?: number;
}
