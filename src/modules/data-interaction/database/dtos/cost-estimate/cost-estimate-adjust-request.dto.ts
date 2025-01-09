import { ApiProperty } from "@nestjs/swagger";
import {IsString, Length} from "class-validator";


export class CostEstimateAdjustRequestDto {
    @ApiProperty()
     @Length(4, 500)
    @IsString()
    adjustDetails: string;
}
