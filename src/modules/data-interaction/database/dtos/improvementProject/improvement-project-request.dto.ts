import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsString} from "class-validator";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { UserEntity } from "../../entitites/user.entity";
import { BidDocumentEnum } from "../../enums/bid-document.enum";
import { ImprovementProjectStatusEnum } from "../../enums/improvement-project-status.enum";


export class ImprovementProjectRequestDto {


    @ApiProperty()
    workRequestId?: string;

    workRequest: WorkRequestEntity
    
    @ApiProperty()
    documentId?: string;

    document?: BidDocumentEntity

    @ApiProperty({ enum: ImprovementProjectStatusEnum })
    @IsEnum(ImprovementProjectStatusEnum)
    status: ImprovementProjectStatusEnum;

    @ApiProperty()
    professionalId?: string

    professional?: UserEntity;
    

}
