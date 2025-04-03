import { ApiProperty } from "@nestjs/swagger";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";



export class ImprovementProjectAddDocumentRequestDto {

    @ApiProperty()
    documentId?: string;

    document?: BidDocumentEntity
}
