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
import { UserProgramTypeEnum } from '../../enums/user-program-type.enum';

export class CreateUserDto {
    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty({ enum: UserTypeEnum })
    @IsOptional()
    type?: UserTypeEnum;

    @ApiProperty()
    @IsOptional()
    phone?: string;

    @ApiProperty()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @IsOptional()
    cpf?: string;

    @ApiProperty({ type: CreateAddressDto })
    @IsOptional()
    address?: CreateAddressDto;

    @ApiProperty()
    @IsOptional()
    age?: number;

    @ApiProperty({ enum: UserBirthGenderEnum })
    @IsOptional()
    birthGender?: UserBirthGenderEnum;

    @ApiProperty({ example: '1999-12-31' })
    @IsOptional()
    birthDate?: string;

    @ApiProperty({ enum: UserGenderIdentityEnum })
    @IsOptional()
    genderIdentity?: UserGenderIdentityEnum;

    @ApiProperty({ example: 'Boeing AH-64 Apache' })
    @IsOptional()
    customGenderIdentity?: string;

    @ApiProperty({ enum: LevelOfEducationEnum })
    @IsOptional()
    levelOfEducation?: LevelOfEducationEnum;

    @ApiProperty({ enum: MaritalStatusEnum })
    @IsOptional()
    maritalStatus?: MaritalStatusEnum;

    @ApiProperty({ enum: UserMonthlyFamilyIncomeEnum })
    @IsOptional()
    monthlyFamilyIncome?: UserMonthlyFamilyIncomeEnum;

    @ApiProperty({ enum: RaceEnum })
    @IsOptional()
    race?: RaceEnum;

    @ApiProperty({ type: MediaUploadDto })
    @IsOptional()
    uploadedProfilePicture?: MediaUploadDto;

    @ApiProperty({ example: '1234' })
    @IsOptional()
    password?: string;

    @ApiProperty({ type: CreateUserBeneficiaryInfoDto, required: false })
    @IsOptional()
    beneficiaryUserInfo?: CreateUserBeneficiaryInfoDto;

    @ApiProperty({ type: CreateUserProfessionalInfoDto, required: false })
    @IsOptional()
    professionalUserInfo?: CreateUserProfessionalInfoDto;

    profilePicture?: string;
    @ApiProperty({ enum: UserProgramTypeEnum })
    @IsOptional()
    programType?: UserProgramTypeEnum
}
