import { ApiProperty } from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import { ContractCancelReasonEnum } from "../../enums/contract-cancel-reason.enum";


export class ContractCancelDto {
    @ApiProperty({ enum: ContractCancelReasonEnum })
    @IsEnum(ContractCancelReasonEnum)
    cancelReasonEnum: ContractCancelReasonEnum;

    @ApiProperty({ type: String })
    cancelationReason?: string

    @ApiProperty({ type: String, example: 'beneficario' })
    userType?: string

    @ApiProperty({ type: String })
    workrequestId?: string

}
