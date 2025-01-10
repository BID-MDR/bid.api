import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsString} from "class-validator";
import { ImprovementProjectStatusEnum } from "../../enums/improvement-project-status.enum";


export class ImprovementProjectUpdateStatusRequestDto {
    @ApiProperty({ enum: ImprovementProjectStatusEnum })
    @IsEnum(ImprovementProjectStatusEnum)
    status: ImprovementProjectStatusEnum; 

}
