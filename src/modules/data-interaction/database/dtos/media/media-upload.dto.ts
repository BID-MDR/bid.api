import { ApiProperty } from "@nestjs/swagger";
import { IsDataURI, IsMimeType, IsNotEmpty, IsString } from "class-validator";

export class MediaUploadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fileName: string;

    @ApiProperty()
    @IsDataURI()
    data: string;

    @ApiProperty()
    @IsMimeType()
    mimeType: string;
}