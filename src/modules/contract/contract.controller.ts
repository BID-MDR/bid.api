import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ContractService } from "./contract.service";
import { CreateContractRequestDto } from "../data-interaction/database/dtos/contract/contract-request.dto";
import { ContractUpdateStatusDto } from "../data-interaction/database/dtos/contract/contract-update-status.dto";
import { ContractCancelDto } from "../data-interaction/database/dtos/contract/contract-cancel.dto";

@Controller("contract")
@ApiTags("contract")
export class ContractController {
  private readonly _logger = new Logger(ContractController.name);
  constructor(private service: ContractService) {}

  @Get("by-professional/:id")
  @ApiBearerAuth()
  async list(@Param("id") id: string,) {
    return await this.service.list(id);
  }

  @Get("by-beneficiary/:id")
  @ApiBearerAuth()
  async listByBeneficiary(@Param("id") id: string,) {
    return await this.service.listByBeneficiary(id);
  }


  @Get("id/:id")
  @ApiBearerAuth()
  async getById(@Param("id") id: string) {
    return await this.service.getById(id);
  }

 
  @Post("")
 // @ApiBearerAuth()
  @ApiBody({
    type: CreateContractRequestDto,
    required: true,
    description: "Intervenção a ser criada.",
  })
  async create(@Body() dto: CreateContractRequestDto) {
    return await this.service.register(dto);
  }


  @Put("id/:id")
  @ApiBearerAuth()
  async update(@Param("id") id: string, @Body() dto: CreateContractRequestDto) {
    return await this.service.update(id, dto);
  }

  @Put("update-status/:id")
  @ApiBearerAuth()
  async updateStatus(@Param("id") id: string, @Body() dto: ContractUpdateStatusDto) {
    return await this.service.updateStatus(id, dto);
  }

  @Put("cancel-contract/:id")
  @ApiBearerAuth()
  async cancelContract(@Param("id") id: string, @Body() dto: ContractCancelDto) {

    return await this.service.cancelContract(id, dto);
  }

 
}