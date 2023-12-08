import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { LevelOfEducationEnum } from '../../enums/level-of-education.enum';
import { MaritalStatusEnum } from '../../enums/marital-status.enum';
import { RaceEnum } from '../../enums/race.enum';
import { AddressResponseDto } from '../address/response-address.dto';
import { PortifolioTypeEnum } from '../../enums/portifolio-type.enum';
import { UserTypeEnum } from '../../enums/user-type.enum';

class ProfessionalUserInfoResponseDto {
    @ApiProperty({ enum: PortifolioTypeEnum })
    portifolioType: PortifolioTypeEnum;

    @ApiProperty()
    portifolioLink: string;

    @ApiProperty()
    confeaRegistrationNumber: string;

    @ApiProperty()
    cauRegistrationNumber: string;

    @ApiProperty()
    laborAvailability: boolean;

    @ApiProperty()
    materialPurchaseAndDeliveryAvailability: boolean;

    @ApiProperty()
    laborValue: number;
}

export class BeneficiaryUserInfoResponseDto {
    @ApiProperty()
    allowProfileListing: boolean;
}

@Exclude()
export class UserResponseDto {
    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty({ enum: UserTypeEnum })
    @Expose()
    type: UserTypeEnum;

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

    @ApiProperty({ type: () => ProfessionalUserInfoResponseDto })
    @Expose()
    @Transform(({ value }) => value ?? undefined)
    professionalUserInfo: ProfessionalUserInfoResponseDto;

    @ApiProperty({ type: () => BeneficiaryUserInfoResponseDto })
    @Expose()
    @Transform(({ value }) => value ?? undefined)
    beneficiaryUserInfo: BeneficiaryUserInfoResponseDto;

    @ApiProperty({ type: Date, isArray: true })
    @Expose()
    agenda: Date[];
}
