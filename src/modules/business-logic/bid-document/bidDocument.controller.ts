import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BidDocumentService } from "./bidDocument.service";
import { BidDocumentRequestDto } from "src/modules/data-interaction/database/dtos/bidDocument/bid-document-create.dto";

@Controller("bid-document")
@ApiTags("bid-document")
export class BidDocumentController {
  private readonly _logger = new Logger(BidDocumentController.name);
  constructor(private service: BidDocumentService) {}

  @Get("")
  @ApiBearerAuth()
  async list() {
    return await this.service.list();
  }

  @Get("id/:id")
  @ApiBearerAuth()
  async getById(@Param("id") id: string) {
    return await this.service.findById(id);
  }

 
  @Post("")
  //@ApiBearerAuth()
  @ApiBody({
    type: BidDocumentRequestDto,
    required: true,
  })
  async create(@Body() dto: BidDocumentRequestDto) {
    return await this.service.register(dto);
  }


 
}