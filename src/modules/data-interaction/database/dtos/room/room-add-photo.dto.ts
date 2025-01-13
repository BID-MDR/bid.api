import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested} from "class-validator";
import { MediaUploadDto } from "../media/media-upload.dto";
import { Type } from "class-transformer";


export class RoomAddPhotoDto {

    @ApiProperty({ type: [MediaUploadDto] })
    @ValidateNested()
    @Type(() => MediaUploadDto)
    startWorkPhotosBase64?: MediaUploadDto[];
    
    startWorkPhotos?: string[]

    @ApiProperty({ type: [MediaUploadDto] })
    @ValidateNested()
    @Type(() => MediaUploadDto)
    endWorkPhotosBase64?: MediaUploadDto[];
    
    endWorkPhotos?: string[]
}
