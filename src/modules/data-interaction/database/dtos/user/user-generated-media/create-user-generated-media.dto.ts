import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsEnum, IsMimeType } from 'class-validator';
import { MediaTypeEnum } from '../../../enums/media-type.enum';

export class CreateUserGeneratedMediaDto {
    @ApiProperty({
        example:
            'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYGBgYGBgYGBgYGBgYGBgYGBgYHSggGBolHRgXITEhJSkrLi4uGB8zODMsNygtLisB',
    })
    @IsDataURI()
    url: string;

    @ApiProperty({ enum: MediaTypeEnum })
    @IsEnum(MediaTypeEnum)
    type: MediaTypeEnum;

    @ApiProperty({ example: 'image/jpeg' })
    @IsMimeType()
    mimeType: string;
}
