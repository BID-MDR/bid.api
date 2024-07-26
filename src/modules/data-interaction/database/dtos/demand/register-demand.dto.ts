import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';

export class DemandRegisterRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(3, 100)
    document: string;

    @ApiProperty()
    @Length(2, 100)
    state: string;

    @ApiProperty()
    @Length(3, 100)
    city: string;

    @ApiProperty()
    @Length(3, 100)
    zipcode: string;

    @ApiProperty()
    @Length(3, 100)
    complement: string;

    @ApiProperty()
    @Length(3, 100)
    neighborhood: string;

    @ApiProperty()
    @Length(3, 100)
    number: string;

    @ApiProperty()
    @Length(3, 100)
    street: string;

    @ApiProperty()
    @Length(3, 100)
    latitude: string;

    @ApiProperty()
    @Length(3, 100)
    longitude: string;

    beneficiary: UserEntity

    professional: UserEntity;
}
