import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsString} from "class-validator";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { UserProfessionalInfoEntity } from "../../entitites/user-professional-info.entity";
import { ContractResignedReasonEnum } from "../../enums/contract-resigned-reason-enum.status";
import { ContractResignedStatusEnum } from "../../enums/contract-resigned-stauts.enum";


export class CreateContractResignedUpdateStatusRequestDto {



    @ApiProperty({ enum: ContractResignedReasonEnum , required: false})
    @IsEnum(ContractResignedReasonEnum)
    reason?: ContractResignedReasonEnum;
    

    @ApiProperty({ enum: ContractResignedStatusEnum, required: false })
    @IsEnum(ContractResignedStatusEnum)
    status?: ContractResignedStatusEnum;

}
