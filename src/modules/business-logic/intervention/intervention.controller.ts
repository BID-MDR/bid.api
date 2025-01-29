import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateInterventionRequestDto } from "src/modules/data-interaction/database/dtos/intervention/intervention-request.dto";
import { InterventionService } from "./intervention.service";

@Controller("intervention")
@ApiTags("intervention")
export class InterventionController {
  private readonly _logger = new Logger(InterventionController.name);
  constructor(private service: InterventionService) { }

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

  @Delete("id/:id")
  @ApiBearerAuth()
  async delete(@Param("id") id: string) {
    return await this.service.delete(id);
  }

  @Delete("contract/:contractId/room/:roomId/interventions")
  @ApiBearerAuth()
  async deleteAllInterventionsFromRoom(
    @Param("contractId") contractId: string,
    @Param("roomId") roomId: string
  ) {
    return await this.service.deleteAllInterventionsFromRoom(contractId, roomId);
  }

  @Delete("contract/:contractId/room/:roomId/intervention/:interventionId")
  @ApiBearerAuth()
  async deleteOneInterventionFromRoom(
    @Param("contractId") contractId: string,
    @Param("roomId") roomId: string,
    @Param("interventionId") interventionId: string
  ) {
    return await this.service.deleteOneInterventionFromRoom(
      contractId,
      roomId,
      interventionId
    );
  }
}