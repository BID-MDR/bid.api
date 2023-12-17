import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PrecarityTypeEnum } from '../../../enums/precarity-type.enum';

export class CreateWorkRequestPrecarityDto {
    @ApiProperty({ enum: PrecarityTypeEnum })
    @IsEnum(PrecarityTypeEnum)
    precarity: PrecarityTypeEnum;
}
