import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RestingDayEnum } from '../../../enums/resting-day.enu';

export class CreateUserRestingDayDto {
    @ApiProperty({ enum: RestingDayEnum })
    @IsEnum(RestingDayEnum)
    day: RestingDayEnum;
}
