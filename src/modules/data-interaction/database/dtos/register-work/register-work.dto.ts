import { ApiProperty } from "@nestjs/swagger";
import { WorkRequestEntity } from "../../entitites/work-request.entity";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { UserProfessionalInfoEntity } from "../../entitites/user-professional-info.entity";



export class RegisterWorkCreateDto {
    @ApiProperty()
    workRequestId?: string;

    workRequest?: WorkRequestEntity;


    @ApiProperty()
    description: string
    @ApiProperty()
    area:number


    @ApiProperty()
    bidDocumentId?: string;


    bidDocument?: BidDocumentEntity;

    @ApiProperty()
    professionalId?: string;


    professional?: UserProfessionalInfoEntity;

}
