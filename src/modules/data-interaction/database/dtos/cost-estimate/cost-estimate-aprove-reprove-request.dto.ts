import { ApiProperty } from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import { CostEstimateStatusEnum } from "../../enums/cost-estimate-status.enum";


export class CostEstimateAproveReproveRequestDto {
    @ApiProperty({ enum: CostEstimateStatusEnum })
    @IsEnum(CostEstimateStatusEnum)
    type: CostEstimateStatusEnum;

    @ApiProperty()
   interventionId?: string[];
 
 

}
