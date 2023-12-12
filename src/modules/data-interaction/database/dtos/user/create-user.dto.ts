import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsCurrency,
    IsDataURI,
    IsDefined,
    IsEmail,
    IsEnum,
    IsMilitaryTime,
    IsNumberString,
    IsOptional,
    IsPhoneNumber,
    IsPositive,
    IsUrl,
    Length,
    Max,
    Min,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { LevelOfEducationEnum } from '../../enums/level-of-education.enum';
import { MaritalStatusEnum } from '../../enums/marital-status.enum';
import { PortifolioTypeEnum } from '../../enums/portifolio-type.enum';
import { RaceEnum } from '../../enums/race.enum';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { CreateAddressDto } from '../address/create-address.dto';
import { RestingDayEnum } from '../../enums/resting-day.enu';

class BeneficiaryUserInfoDto {
    @ApiProperty()
    @IsBoolean()
    allowProfileListing: boolean;
}

class UserRestingDayDto {
    @ApiProperty({ enum: RestingDayEnum })
    @IsEnum(RestingDayEnum)
    day: RestingDayEnum;
}

class ProfessionalUserInfoDto {
    @ApiProperty({ enum: PortifolioTypeEnum })
    @IsEnum(PortifolioTypeEnum)
    portifolioType: PortifolioTypeEnum;

    @ApiProperty()
    @IsUrl({
        allow_fragments: true,
        require_protocol: true,
        allow_protocol_relative_urls: true,
        allow_query_components: true,
        allow_underscores: true,
    })
    portifolioLink: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumberString()
    confeaRegistrationNumber: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumberString()
    cauRegistrationNumber: string;

    @ApiProperty()
    @IsCurrency({
        allow_decimal: true,
        digits_after_decimal: [1, 2],
        require_symbol: false,
        allow_negatives: false,
        symbol: 'R$',
    })
    laborValue: number;

    @ApiProperty({ type: UserRestingDayDto })
    @ValidateNested({ each: true })
    @Type(() => UserRestingDayDto)
    restingDays: UserRestingDayDto[];

    @ApiProperty({ description: 'Horário militar' })
    @IsMilitaryTime()
    worksFrom: string;

    @ApiProperty({ description: 'Horário militar' })
    @IsMilitaryTime()
    worksTo: string;

    @ApiProperty()
    @IsPositive()
    maximumDistanceToWorks: number;
}

export class CreateUserDto {
    @ApiProperty()
    @Length(1, 70)
    name: string;

    @ApiProperty({ enum: UserTypeEnum })
    @IsEnum(UserTypeEnum)
    type: UserTypeEnum;

    @ApiProperty()
    @IsPhoneNumber('BR')
    phone: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: CreateAddressDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    addresses: CreateAddressDto[];

    @ApiProperty()
    @Min(18)
    @Max(120)
    age: number;

    @ApiProperty({ enum: ['M', 'F', 'O'] })
    @IsEnum(['M', 'F', 'O'])
    birthGender: string;

    @ApiProperty({ enum: LevelOfEducationEnum })
    @IsEnum(LevelOfEducationEnum)
    levelOfEducation: LevelOfEducationEnum;

    @ApiProperty({ minimum: 1900, maximum: new Date().getFullYear() })
    @Min(1900)
    @Max(new Date().getFullYear())
    gradYear: number;

    @ApiProperty({ enum: MaritalStatusEnum })
    @IsEnum(MaritalStatusEnum)
    maritalStatus: MaritalStatusEnum;

    @ApiProperty()
    @IsCurrency({
        allow_decimal: true,
        digits_after_decimal: [1, 2],
        require_symbol: false,
        allow_negatives: false,
    })
    monthlyFamilyIncome: number;

    @ApiProperty({ enum: RaceEnum })
    @IsEnum(RaceEnum)
    race: RaceEnum;

    @ApiProperty()
    @IsDataURI()
    profilePicture: string;

    @ApiProperty()
    @IsNumberString()
    @Length(4, 4)
    password: string;

    @ApiProperty({ type: BeneficiaryUserInfoDto, required: false })
    @ValidateNested({ each: true })
    @Type(() => BeneficiaryUserInfoDto)
    @ValidateIf((o) => o.type === UserTypeEnum.BENEFICIARIO)
    @IsDefined()
    beneficiaryUserInfo: BeneficiaryUserInfoDto;

    @ApiProperty({ type: ProfessionalUserInfoDto, required: false })
    @ValidateNested({ each: true })
    @Type(() => ProfessionalUserInfoDto)
    @ValidateIf((o) => o.type === UserTypeEnum.PROFISSIONAL)
    @IsDefined()
    professionalUserInfo: ProfessionalUserInfoDto;
}
