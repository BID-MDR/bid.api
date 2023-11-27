import { ApiProperty } from '@nestjs/swagger';
import { IsCEP } from 'brazilian-class-validator';
import { IsLatitude, IsLongitude, Length } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty()
    @Length(2, 2)
    state: string;

    @ApiProperty()
    @Length(1, 50)
    city: string;

    @ApiProperty()
    @IsCEP()
    zipcode: string;

    @ApiProperty()
    @Length(1, 50)
    complement: string;

    @ApiProperty()
    @Length(1, 50)
    neighborhood: string;

    @ApiProperty()
    @Length(1, 10)
    number: string;

    @ApiProperty()
    @Length(1, 30)
    street: string;

    @ApiProperty()
    @IsLatitude()
    latitude: string;

    @ApiProperty()
    @IsLongitude()
    longitude: string;
}
