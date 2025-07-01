import { ApiProperty } from "@nestjs/swagger";
import {IsString, ValidateNested} from "class-validator";
import { RoomEntity } from "../../entitites/room.entity";
import { InterventionStatusEnum } from "../../enums/intervention-status.enum";
import { MediaUploadDto } from "../media/media-upload.dto";
import { Type } from "class-transformer";


export class CreateInterventionRequestDto {
    @ApiProperty()
    roomId?: string;


    room?: RoomEntity;

    
    @ApiProperty()
    // @IsString()
    value: string;

    @ApiProperty()
    // @IsString()
    toDo: string;

    @ApiProperty({
      example: 'COST_ESTIMATE,CONTRACT',
    })
    // @IsString()
    step: string;

    @ApiProperty({

        example: 'NOT_COMPLETED || PARTIALY_COMPLETED || CONCLUDED'
    })
    interventionSituation?: InterventionStatusEnum;

    @ApiProperty()
    interventiondescription?: string;

    @ApiProperty({ type: [MediaUploadDto] })
    @ValidateNested()
    @Type(() => MediaUploadDto)
    selectedFilesBeginning?: MediaUploadDto[];

    @ApiProperty({ type: [MediaUploadDto] })
    @ValidateNested()
    @Type(() => MediaUploadDto)
    selectedFilesEnding?: MediaUploadDto[];

    endingPicture?: string[];
  beginningPicture?: string[];
}
