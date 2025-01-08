import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../../core/decorators/roles.decorator";
import { ApiOkResponseDtoData } from "../../../core/decorators/swagger/api-ok-response-dto.decorator";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { RolesGuard } from "../../../core/guards/roles.guard";
import { EmployeeRoleEnum } from "../../data-interaction/database/enums/employee-role.enum";
import { InterventionService } from "./intervention.service";
import { Request } from "express";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { SustainabilityItensRequestDto } from "src/modules/data-interaction/database/dtos/work-request/sustainability-itens-request.dto";
import { CreateInterventionRequestDto } from "src/modules/data-interaction/database/dtos/intervention/intervention-request.dto";

@Controller("intervention")
@ApiTags("intervention")
export class InterventionController {
  private readonly _logger = new Logger(InterventionController.name);
  constructor(private service: InterventionService) {}

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
    type: CreateInterventionRequestDto,
    required: true,
    description: "Intervenção a ser criada.",
  })
  async create(@Body() dto: CreateInterventionRequestDto) {
    return await this.service.register(dto);
  }


  @Put("id/:id")
  @ApiBearerAuth()
  async update(@Param("id") id: string, @Body() dto: CreateInterventionRequestDto) {
    return await this.service.update(id, dto);
  }

 
}