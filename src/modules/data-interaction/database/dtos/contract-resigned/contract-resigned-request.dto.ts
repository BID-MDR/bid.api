import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsString} from "class-validator";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { ContractResignedReasonEnum } from "../../enums/contract-resigned-reason-enum.status";
import { ContractResignedStatusEnum } from "../../enums/contract-resigned-stauts.enum";
import { UserEntity } from "../../entitites/user.entity";


export class CreateContractResignedRequestDto {


    @ApiProperty()
    workRequestId?: string;

    workRequest: WorkRequestEntity

    @ApiProperty()
    bidDocumentId?: string;

    bidDocument: BidDocumentEntity

    @ApiProperty()
    professionalId?: string;

    professional: UserEntity

    @ApiProperty({ enum: ContractResignedReasonEnum })
    @IsEnum(ContractResignedReasonEnum)
    reason: ContractResignedReasonEnum;
    

    @ApiProperty()
    technicalvisit?: Date

    @ApiProperty()
    owedValue?: string;

    @ApiProperty({ enum: ContractResignedStatusEnum, required: false })
    status?: ContractResignedStatusEnum

}
