import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CostEstimateService } from "./costEstimate.service";
import { CreateCostEstimateRequestDto } from "src/modules/data-interaction/database/dtos/cost-estimate/cost-estimate-request.dto";

@Controller("cost-estimate")
@ApiTags("cost-estimate")
export class CostEstimateController {
  private readonly _logger = new Logger(CostEstimateController.name);
  constructor(private service: CostEstimateService) {}

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
    type: CreateCostEstimateRequestDto,
    required: true,
    description: "Intervenção a ser criada.",
  })
  async create(@Body() dto: CreateCostEstimateRequestDto) {
    return await this.service.register(dto);
  }


  @Put("id/:id")
  @ApiBearerAuth()
  async update(@Param("id") id: string, @Body() dto: CreateCostEstimateRequestDto) {
    return await this.service.update(id, dto);
  }

 
}