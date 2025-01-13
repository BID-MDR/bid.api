import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import {  ApiBody,  ApiTags } from "@nestjs/swagger";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { ImpromentProjectService } from "./improvement-project.service";
import { ImprovementProjectRequestDto } from "src/modules/data-interaction/database/dtos/improvementProject/improvement-project-request.dto";
import { ImprovementProjectUpdateStatusRequestDto } from "src/modules/data-interaction/database/dtos/improvementProject/improvement-project-update-status-request.dto";
import { ImprovementProjectAddDocumentRequestDto } from "src/modules/data-interaction/database/dtos/improvementProject/improvement-project-add-document-request.dto";

@Controller("improvement-project")
@ApiTags("Improvement Project/Projeto de melhoria")
export class ImprovementProjectController {
  private readonly _logger = new Logger(ImprovementProjectController.name);
  constructor(private service: ImpromentProjectService) {}

  @Get("")
  async list() {
    return await this.service.list();
  }

  @Get("id/:id")
  async getById(@Param("id") id: string) {
    return await this.service.findById(id);
  }

  
  @Post("")
  //@ApiBearerAuth()
  @ApiBody({
    type: ImprovementProjectRequestDto,
    required: true,
  })
  async create(@Body() dto: ImprovementProjectRequestDto) {
    return await this.service.register(dto, );
  }

  @Put("update-status/:id")
  @ApiBody({
    type: ImprovementProjectUpdateStatusRequestDto,
    required: true,
  })
  async updateStatus(@Param("id") id: string, @Body() dto: ImprovementProjectUpdateStatusRequestDto) {
    return await this.service.updateProjectStatus(id, dto);
  }

  @Put("add-document/:id")
  @ApiBody({
    type: ImprovementProjectAddDocumentRequestDto,
    required: true,
  })
  async addDocument(@Param("id") id: string, @Body() dto: ImprovementProjectAddDocumentRequestDto) {
    return await this.service.addDocument(id, dto);
  }


}