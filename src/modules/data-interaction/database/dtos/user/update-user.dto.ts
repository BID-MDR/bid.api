import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { UpdateAddressDto } from '../address/update-address.dto';
import { CreateUserDto } from './create-user.dto';
import { CreateUserAppointmentDto } from './user-appointment/create-user-appointment.dto';
import { UpdateUserAppointmentDto } from './user-appointment/update-user-appointment.dto';
import { UpdateUserBeneficiaryInfoDto } from './user-beneficiary-info/update-user-beneficiary-info.dto';
import { UpdateUserProfessionalInfoDto } from './user-professional-info/update-user-professional-info.dto';

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
    'password',
    'beneficiaryUserInfo',
    'professionalUserInfo',
    'addresses',
]) {
    @ApiProperty({ type: CreateUserAppointmentDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CreateUserAppointmentDto)
    @IsOptional()
    newAppointments: CreateUserAppointmentDto[];

    @ApiProperty({ type: UpdateUserAppointmentDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateUserAppointmentDto)
    @IsOptional()
    updateAppointments: UpdateUserAppointmentDto[];

    @ApiProperty({ type: UpdateUserBeneficiaryInfoDto, required: false })
    @ValidateNested({ each: true })
    @Type(() => UpdateUserBeneficiaryInfoDto)
    @ValidateIf((o) => o.type === UserTypeEnum.BENEFICIARIO)
    @IsDefined()
    beneficiaryUserInfo: UpdateUserBeneficiaryInfoDto;

    @ApiProperty({ type: UpdateUserProfessionalInfoDto, required: false })
    @ValidateNested({ each: true })
    @Type(() => UpdateUserProfessionalInfoDto)
    @ValidateIf((o) => o.type === UserTypeEnum.PROFISSIONAL)
    @IsDefined()
    professionalUserInfo: UpdateUserProfessionalInfoDto;

    @ApiProperty({ type: UpdateAddressDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    addresses: UpdateAddressDto[];
}
