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
    name: string;

    @ApiProperty({ enum: UserTypeEnum })
    type: UserTypeEnum;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    cpf: string;

    @ApiProperty({ type: CreateAddressDto })
    address: CreateAddressDto;

    @ApiProperty()
    @IsOptional()
    age: number;

    @ApiProperty({ enum: UserBirthGenderEnum })
    birthGender: UserBirthGenderEnum;

    @ApiProperty({ example: '1999-12-31' })
    birthDate: string;

    @ApiProperty({ enum: UserGenderIdentityEnum })
    genderIdentity: UserGenderIdentityEnum;

    @ApiProperty({ example: 'Boeing AH-64 Apache' })
    @IsOptional()
    customGenderIdentity: string;

    @ApiProperty({ enum: LevelOfEducationEnum })
    levelOfEducation: LevelOfEducationEnum;

    @ApiProperty({ enum: MaritalStatusEnum })
    maritalStatus: MaritalStatusEnum;

    @ApiProperty({ enum: UserMonthlyFamilyIncomeEnum })
    @IsOptional()
    monthlyFamilyIncome: UserMonthlyFamilyIncomeEnum;

    @ApiProperty({ enum: RaceEnum })
    race: RaceEnum;

    @ApiProperty({ type: MediaUploadDto })
    uploadedProfilePicture?: MediaUploadDto;

    @ApiProperty({ example: '1234' })
    password: string;

    @ApiProperty({ type: CreateUserBeneficiaryInfoDto, required: false })
    beneficiaryUserInfo?: CreateUserBeneficiaryInfoDto;

    @ApiProperty({ type: CreateUserProfessionalInfoDto, required: false })
    professionalUserInfo?: CreateUserProfessionalInfoDto;

    profilePicture?: string;
    @ApiProperty({ enum: UserProgramTypeEnum })
    programType?: UserProgramTypeEnum
}
