import { ApiProperty } from '@nestjs/swagger';
import { IsCPF } from 'brazilian-class-validator';
import { Type } from 'class-transformer';
import {
    IsCurrency,
    IsDateString,
    IsDefined,
    IsEmail,
    IsEnum,
    IsNumberString,
    IsOptional,
    IsPhoneNumber,
    Length,
    Max,
    Min,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { LevelOfEducationEnum } from '../../enums/level-of-education.enum';
import { MaritalStatusEnum } from '../../enums/marital-status.enum';
import { RaceEnum } from '../../enums/race.enum';
import { UserBirthGenderEnum } from '../../enums/user-birth-gender.enum';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { CreateAddressDto } from '../address/create-address.dto';
import { MediaUploadDto } from '../media/media-upload.dto';
import { CreateUserBeneficiaryInfoDto } from './user-beneficiary-info/create-user-beneficiary-info.dto';
import { CreateUserProfessionalInfoDto } from './user-professional-info/create-user-professional-info.dto';
import { UserGenderIdentityEnum } from '../../enums/user-gender-identity.enum';
import { UserMonthlyFamilyIncomeEnum } from '../../enums/user-monthly-family-income.enum';

export class CreateUserDto {
    @ApiProperty()
    @Length(1, 70)
    name: string;

    @ApiProperty({ enum: UserTypeEnum })
    @IsEnum(UserTypeEnum)
    type: UserTypeEnum;

    @ApiProperty({ example: '+5511999999999' })
    @IsPhoneNumber('BR')
    phone: string;

    @ApiProperty({ example: 'test@email.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345678901' })
    @IsCPF()
    cpf: string;

    @ApiProperty({ type: CreateAddressDto })
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;

    @ApiProperty({ example: 18 })
    @Min(18)
    @Max(120)
    @IsOptional()
    age: number;

    @ApiProperty({ enum: UserBirthGenderEnum })
    @IsEnum(UserBirthGenderEnum)
    birthGender: UserBirthGenderEnum;

    @ApiProperty({ example: '1999-12-31' })
    @IsDefined()
    @IsDateString()
    birthDate: string;

    @ApiProperty({ enum: UserGenderIdentityEnum })
    @IsEnum(UserGenderIdentityEnum)
    genderIdentity: UserGenderIdentityEnum;

    @ApiProperty({ example: 'Boeing AH-64 Apache' })
    @Length(1, 100)
    @IsOptional()
    customGenderIdentity: string;

    @ApiProperty({ enum: LevelOfEducationEnum })
    @IsEnum(LevelOfEducationEnum)
    levelOfEducation: LevelOfEducationEnum;

    @ApiProperty({ enum: MaritalStatusEnum })
    @IsEnum(MaritalStatusEnum)
    maritalStatus: MaritalStatusEnum;

    @ApiProperty({ enum: UserMonthlyFamilyIncomeEnum })
    @IsEnum(UserMonthlyFamilyIncomeEnum)
    @IsOptional()
    monthlyFamilyIncome: UserMonthlyFamilyIncomeEnum;

    @ApiProperty({ enum: RaceEnum })
    @IsEnum(RaceEnum)
    race: RaceEnum;

    @ApiProperty({ type: MediaUploadDto })
    @ValidateNested()
    @Type(() => MediaUploadDto)
    uploadedProfilePicture: MediaUploadDto;

    @ApiProperty({ example: '1234' })
    @IsNumberString()
    @Length(4, 4)
    password: string;

    @ApiProperty({ type: CreateUserBeneficiaryInfoDto, required: false })
    @ValidateNested({ each: true })
    @Type(() => CreateUserBeneficiaryInfoDto)
    @ValidateIf((o) => o.type === UserTypeEnum.BENEFICIARIO)
    @IsDefined()
    beneficiaryUserInfo: CreateUserBeneficiaryInfoDto;

    @ApiProperty({ type: CreateUserProfessionalInfoDto, required: false })
    @ValidateNested({ each: true })
    @Type(() => CreateUserProfessionalInfoDto)
    @ValidateIf((o) => o.type === UserTypeEnum.PROFISSIONAL)
    @IsDefined()
    professionalUserInfo: CreateUserProfessionalInfoDto;

    profilePicture: string;
}
