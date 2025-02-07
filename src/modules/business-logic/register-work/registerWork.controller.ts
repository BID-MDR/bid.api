import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../../core/decorators/roles.decorator";
import { ApiOkResponseDtoData } from "../../../core/decorators/swagger/api-ok-response-dto.decorator";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";

import {  RegisterWorkService } from "./registerWork.service";
import { Request } from "express";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { CreateInterventionRequestDto } from "src/modules/data-interaction/database/dtos/intervention/intervention-request.dto";
import { RegisterWorkCreateDto } from "src/modules/data-interaction/database/dtos/register-work/register-work.dto";
import { ResponseDto } from "src/core/dtos/response.dto";
import { UpdateRegisterWorkDto } from "src/modules/data-interaction/database/dtos/register-work/update-register-work.dto";
import { BidDocumentRequestDto } from "src/modules/data-interaction/database/dtos/bidDocument/bid-document-create.dto";
import { RegisterWorkFinishDto } from "src/modules/data-interaction/database/dtos/register-work/finish-register-work.dto";

@Controller("register-work")
@ApiTags("register-work")
export class RegisterWorkController {
  private readonly _logger = new Logger(RegisterWorkController.name);
  constructor(private service: RegisterWorkService) {}

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
  @ApiBearerAuth()
  @ApiBody({
    type: RegisterWorkCreateDto,
    required: true,
    description: "Obra a ser criada.",
  })
  async create(@Body() dto: RegisterWorkCreateDto) {
    return await this.service.register(dto);
  }

  @Get('list-by-professional')
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth()
  async updatePersonalInfo(@Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    const result = await this.service.getByProfessional(userId);
    return new ResponseDto(true, result, null);
  }
  
  @Get('list-by-beneficary')
  @UseGuards(JwtAccessTokenGuard)
  @ApiBearerAuth()
  async getByBeneficary(@Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    const result = await this.service.getByBeneficary(userId);
    return new ResponseDto(true, result, null);
  }
  


  @Put("id/:id")
  @ApiBearerAuth()
  async update(@Param("id") id: string, @Body() dto: RegisterWorkCreateDto) {
    return await this.service.update(id, dto);
  }

  @Put("update-register-work-from-professional")
  @ApiBearerAuth()
  async updateRegisterWork( @Body() dto: UpdateRegisterWorkDto) {
    return await this.service.updateRegisterWork(dto);
  }

  @Put("finish-register-work/:registerWorkId")
  @ApiBearerAuth()
  async finishRegisterWork(@Param('registerWorkId') registerWorkId: string, @Body() dto: RegisterWorkFinishDto) {
    return await this.service.finishRegisterWork(registerWorkId, dto);
  }

  @Put("start-work/:id")
  @ApiBearerAuth()
  async startWork(@Param("id") id: string) {
    return await this.service.startWork(id);
  }

  @Put("end-work/:id")
  @ApiBearerAuth()
  async endRegisterWork(@Param("id") id: string) {
    return await this.service.endRegisterWork(id);
  }

 
}