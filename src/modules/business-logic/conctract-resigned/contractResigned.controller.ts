import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ContractResignedService } from "./contractResigned.service";
import { CreateContractResignedRequestDto } from "src/modules/data-interaction/database/dtos/contract-resigned/contract-resigned-request.dto";
import { CreateContractResignedUpdateStatusRequestDto } from "src/modules/data-interaction/database/dtos/contract-resigned/contract-resigned-update-status-request.dto";

@Controller("contract-resigned")
@ApiTags("contract-resigned")
export class ContractResignedController {
  private readonly _logger = new Logger(ContractResignedController.name);
  constructor(private service: ContractResignedService) {}

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

  @Get("by-workRequest/:id")
  @ApiBearerAuth()
  async getByworkRequest(@Param("id") id: string) {
    return await this.service.findContractByWorkRequest(id);
  }

 
  @Post("")
  @ApiBearerAuth()
  @ApiBody({
    type: CreateContractResignedRequestDto,
    required: true,
    description: "Intervenção a ser criada.",
  })
  async create(@Body() dto: CreateContractResignedRequestDto) {
    return await this.service.register(dto);
  }


  @Put("id/:id")
  @ApiBearerAuth()
  async update(@Param("id") id: string, @Body() dto: CreateContractResignedRequestDto) {
    return await this.service.update(id, dto);
  }

  @Put("decline-contract/:id")
  @ApiBearerAuth()
  async declineContract(@Param("id") id: string) {
    return await this.service.declineContract(id);
  }



  @Put("update-status/:id")
  @ApiBearerAuth()
  async updateStatus(@Param("id") id: string, @Body() dto: CreateContractResignedUpdateStatusRequestDto) {
    return await this.service.updateStatus(id, dto);
  }

 
}