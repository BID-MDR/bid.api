import { ApiProperty } from "@nestjs/swagger";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { UserEntity } from "../../entitites/user.entity";
import { WorkRequestEntity } from "../../entitites/work-request.entity";



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


    professional?: UserEntity;

}
