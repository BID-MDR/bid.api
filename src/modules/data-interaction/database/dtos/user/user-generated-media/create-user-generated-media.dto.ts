import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsEnum, IsMimeType } from 'class-validator';
import { MediaTypeEnum } from '../../../enums/media-type.enum';

export class CreateUserGeneratedMediaDto {
    @ApiProperty()
    @IsDataURI()
    url: string;

    @ApiProperty({ enum: MediaTypeEnum })
    @IsEnum(MediaTypeEnum)
    type: MediaTypeEnum;

    @ApiProperty()
    @IsMimeType()
    mimeType: string;
}
