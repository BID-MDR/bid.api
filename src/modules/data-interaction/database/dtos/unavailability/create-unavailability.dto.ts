import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
} from 'class-validator';
import { UnavailabilityRepetitionEnum } from '../../enums/unavailability-repetition.enum';
import { UnavailabilityDaySettingEnum } from '../../enums/unavailability-day-setting.enum';
import { UserEntity } from '../../entitites/user.entity';

export class UnavailabilityCreateDto {
    @ApiProperty()
    reason: string;
    
    @ApiProperty({ type: Date })
    startDate: Date;

    @ApiProperty({ type: Date })
    finishDate: Date;

    @ApiProperty({ enum: UnavailabilityRepetitionEnum,default: UnavailabilityRepetitionEnum.NONE })
    @IsEnum(UnavailabilityRepetitionEnum)
    repetition: UnavailabilityRepetitionEnum;

    @ApiProperty({ enum: UnavailabilityDaySettingEnum,default: UnavailabilityDaySettingEnum.NONE })
    @IsEnum(UnavailabilityDaySettingEnum)
    daySetting: UnavailabilityDaySettingEnum;

    @ApiProperty({type: String})
    userId: string;

    user: UserEntity
}
