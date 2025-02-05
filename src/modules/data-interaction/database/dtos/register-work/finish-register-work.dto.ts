import { ApiProperty } from "@nestjs/swagger";
import { BidDocumentRequestDto } from "../bidDocument/bid-document-create.dto";

// RegisterWorkCreateDto
export class RegisterWorkFinishDto {
    @ApiProperty()
    description?: string;

    documents: BidDocumentRequestDto[]
}