import { ApiProperty } from '@nestjs/swagger';

export class AddressResponseDto {
    @ApiProperty()
    state: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    zipcode: string;

    @ApiProperty()
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
}
