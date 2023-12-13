import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsEnum } from 'class-validator';
import { UserAppointmentTypeEnum } from '../../../enums/user-appointment-type.enum';

export class CreateUserAppointmentDto {
    @ApiProperty({ example: '2009-1-1T8:00:00' })
    @IsISO8601({ strict: true })
    from: Date;

    @ApiProperty({ example: '2009-1-1T8:00:00' })
    @IsISO8601()
    to: Date;

    @ApiProperty({ enum: UserAppointmentTypeEnum })
    @IsEnum(UserAppointmentTypeEnum)
    type: UserAppointmentTypeEnum;
}
