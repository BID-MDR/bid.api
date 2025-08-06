import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { IsLatitude, IsLongitude, IsNumberString, IsOptional, IsPositive, IsUUID, Length } from 'class-validator';
import { IsCEP } from 'brazilian-class-validator';
import { Transform } from 'class-transformer';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    @ApiProperty()
    id!: string;


    @ApiProperty({ example: 'SP' })
    @Length(2, 2)
    state: string;

    @ApiProperty({ required: false })
    @Length(1, 100)
    @IsOptional()
    nickname?: string;

    @ApiProperty()
    @Length(1, 50)
    city: string;

    @ApiProperty({ example: '00000-000' })
    @IsCEP()
    zipcode: string;

    @ApiProperty({ required: false })
    @Transform(({ value }) => (value === '' ? undefined : value))
    @Length(1, 50)
    @IsOptional()
    complement?: string;

    @ApiProperty()
    @Length(1, 50)
    neighborhood: string;

    @ApiProperty()
    number: string;

    @ApiProperty()
    @Length(1, 30)
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

    @ApiProperty({ required: false })
    @IsOptional()
    userId?: string
}
