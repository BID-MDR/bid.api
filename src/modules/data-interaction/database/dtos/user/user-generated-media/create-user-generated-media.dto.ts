import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUrl } from 'class-validator';
import { MediaTypeEnum } from '../../../enums/media-type.enum';

export class CreateUserGeneratedMediaDto {
    @ApiProperty()
    @IsUrl()
    url: string;

    @ApiProperty({ enum: MediaTypeEnum })
    @IsEnum(MediaTypeEnum)
    type: MediaTypeEnum;
}
