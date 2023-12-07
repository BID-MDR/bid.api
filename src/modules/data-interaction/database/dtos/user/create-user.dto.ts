import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNumberString,
    IsOptional,
    IsPhoneNumber,
    IsPositive,
    IsUrl,
    Length,
    Max,
    Min,
    ValidateNested,
} from 'class-validator';
import { LevelOfEducationEnum } from '../../enums/level-of-education.enum';
import { MaritalStatusEnum } from '../../enums/marital-status.enum';
import { RaceEnum } from '../../enums/race.enum';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { CreateAddressDto } from '../address/create-address.dto';
import { PortifolioTypeEnum } from '../../enums/portifolio-type.enum';
import { Type } from 'class-transformer';

class BeneficiaryUserInfoDto {
    @ApiProperty()
    @IsBoolean()
    allowProfileListing: boolean;
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
    @Max(999_999_999)
    @IsPositive()
    monthlyFamilyIncome: number;

    @ApiProperty({ enum: RaceEnum })
    @IsEnum(RaceEnum)
    race: RaceEnum;

    @ApiProperty()
    @IsUrl({})
    profilePicture: string;

    @ApiProperty()
    @IsNumberString()
    @Length(4, 4)
    password: string;

    @ApiProperty({ type: BeneficiaryUserInfoDto, required: false })
    @ValidateNested({ each: true })
    @Type(() => BeneficiaryUserInfoDto)
    @IsOptional()
    beneficiaryUserInfo: BeneficiaryUserInfoDto;

    @ApiProperty({ type: ProfessionalUserInfoDto, required: false })
    @ValidateNested({ each: true })
    @Type(() => ProfessionalUserInfoDto)
    @IsOptional()
    professionalUserInfo: ProfessionalUserInfoDto;
}
