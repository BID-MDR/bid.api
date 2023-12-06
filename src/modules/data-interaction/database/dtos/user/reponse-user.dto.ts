import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { LevelOfEducationEnum } from '../../enums/level-of-education.enum';
import { MaritalStatusEnum } from '../../enums/marital-status.enum';
import { RaceEnum } from '../../enums/race.enum';
import { AddressResponseDto } from '../address/response-address.dto';

@Exclude()
export class UserResponseDto {
    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    phone: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty({ type: AddressResponseDto, isArray: true })
    @Expose()
    addresses: AddressResponseDto[];

    @ApiProperty()
    @Expose()
    age: number;

    @ApiProperty()
    @Expose()
    birthGender: string;

    @ApiProperty({
        enum: LevelOfEducationEnum,
    })
    @Expose()
    levelOfEducation: LevelOfEducationEnum;

    @ApiProperty()
    @Expose()
    gradYear: number;

    @ApiProperty({
        enum: MaritalStatusEnum,
    })
    @Expose()
    maritalStatus: MaritalStatusEnum;

    @ApiProperty()
    @Expose()
    monthlyFamilyIncome: number;

    @ApiProperty({
        enum: RaceEnum,
    })
    @Expose()
    race: RaceEnum;

    @ApiProperty()
    @Expose()
    profilePicture: string;

    @ApiProperty({ type: Date, isArray: true })
    @Expose()
    agenda: Date[];
}
