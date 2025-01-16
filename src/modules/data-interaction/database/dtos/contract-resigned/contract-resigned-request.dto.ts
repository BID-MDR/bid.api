import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsString} from "class-validator";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { UserProfessionalInfoEntity } from "../../entitites/user-professional-info.entity";
import { ContractResignedReasonEnum } from "../../enums/contract-resigned-reason-enum.status";
import { ContractResignedStatusEnum } from "../../enums/contract-resigned-stauts.enum";


export class CreateContractResignedRequestDto {


    @ApiProperty()
    workRequestId?: string;

    workRequest: WorkRequestEntity

    @ApiProperty()
    bidDocumentId?: string;

    bidDocument: BidDocumentEntity

    @ApiProperty()
    professionalId?: string;

    professional: UserProfessionalInfoEntity

    @ApiProperty({ enum: ContractResignedReasonEnum })
    @IsEnum(ContractResignedReasonEnum)
    reason: ContractResignedReasonEnum;
    

    @ApiProperty()
    technicalvisit?: Date

    @ApiProperty()
    owedValue?: string;

    @ApiProperty({ enum: ContractResignedStatusEnum, required: false })
    @IsEnum(ContractResignedStatusEnum)
    status?: ContractResignedStatusEnum;

}
