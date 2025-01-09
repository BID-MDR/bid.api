import { ApiProperty } from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import { ContractStatusEnum } from "../../enums/contract-status.enum";


export class ContractUpdateStatusDto {
    @ApiProperty({ enum: ContractStatusEnum })
    @IsEnum(ContractStatusEnum)
    type: ContractStatusEnum;

    @ApiProperty({ type: String })
    adjustRequested?: string
}
