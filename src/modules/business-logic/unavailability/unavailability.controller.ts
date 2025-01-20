import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UnavailabilityService } from "./unavailability.service";
import { UnavailabilityCreateDto } from "src/modules/data-interaction/database/dtos/unavailability/create-unavailability.dto";

@Controller("unavailability")
@ApiTags("unavailability")
export class UnavailabilityController {
  private readonly _logger = new Logger(UnavailabilityController.name);
  constructor(private service: UnavailabilityService) {}

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
    type: UnavailabilityCreateDto,
    required: true,
    description: "Indisponiblidade a ser criada.",
  })
  async create(@Body() dto: UnavailabilityCreateDto) {
    return await this.service.register(dto);
  }


  @Put("id/:id")
  @ApiBearerAuth()
  async update(@Param("id") id: string, @Body() dto: UnavailabilityCreateDto) {
    return await this.service.update(id, dto);
  }


 
}