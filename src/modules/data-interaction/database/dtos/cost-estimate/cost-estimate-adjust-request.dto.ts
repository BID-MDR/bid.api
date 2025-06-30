import { ApiProperty } from "@nestjs/swagger";
import {IsString, Length} from "class-validator";


export class CostEstimateAdjustRequestDto {

    adjustDetails?: string;

    @ApiProperty()
   workRequestId: string;
}
