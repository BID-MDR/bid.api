import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsISO8601, IsMilitaryTime, IsOptional, ValidateNested } from 'class-validator';
import { UserAppointmentTypeEnum } from '../../enums/user-appointment-type.enum';
import { Type } from 'class-transformer';

class AppointmentDto {
    @ApiProperty({ description: 'Ano-Mes-Dia' })
    @IsISO8601()
    date: string;

    @ApiProperty({ description: 'Horário militar' })
    @IsMilitaryTime()
    timeFrom: string;

    @ApiProperty({ description: 'Horário militar' })
    @IsMilitaryTime()
    timeTo: string;

    @ApiProperty({ enum: UserAppointmentTypeEnum })
    @IsEnum(UserAppointmentTypeEnum)
    type: UserAppointmentTypeEnum;
}

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), ['password']) {
    @ApiProperty({ type: AppointmentDto, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => AppointmentDto)
    @IsOptional()
    appointments: AppointmentDto[];
}
