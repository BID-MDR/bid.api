import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsString, ValidateNested} from "class-validator";
import { BidDocumentEnum } from "../../enums/bid-document.enum";
import { MediaUploadDto } from "../media/media-upload.dto";
import { Type } from "class-transformer";


export class BidDocumentRequestDto {
    @ApiProperty({ enum: BidDocumentEnum })
    @IsEnum(BidDocumentEnum)
    type: BidDocumentEnum;

    @ApiProperty({ type: MediaUploadDto })
    @ValidateNested()
    @Type(() => MediaUploadDto)
    documentMedia: MediaUploadDto;
    
    documentLink: string
}
