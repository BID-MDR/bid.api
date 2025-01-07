import { Body, Controller, Get, Logger, Param, Post, Put, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Roles } from "../../../core/decorators/roles.decorator";
import { ApiOkResponseDtoData } from "../../../core/decorators/swagger/api-ok-response-dto.decorator";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { RolesGuard } from "../../../core/guards/roles.guard";
import { CreateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/create-work-request.dto";
import { ResponseWorkRequestDto } from "../../data-interaction/database/dtos/work-request/response-work-request.dto";
import { UpdateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/update-work-request.dto";
import { EmployeeRoleEnum } from "../../data-interaction/database/enums/employee-role.enum";
import { WorkRequestService } from "./work-request.service";
import { Request } from "express";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { SustainabilityItensRequestDto } from "src/modules/data-interaction/database/dtos/work-request/sustainability-itens-request.dto";

@Controller("work-request")
@ApiTags("Work Request/Vistoria")
export class WorkRequestController {
  private readonly _logger = new Logger(WorkRequestController.name);
  constructor(private service: WorkRequestService) {}

  @Get("")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @ApiOperation({
    description: "Lista de vistorias.",
    summary: "Listar vistorias.",
  })
  @ApiOkResponseDtoData({
    type: ResponseWorkRequestDto,
    description: "Lista de vistorias.",
  })
  @SerializeOptions({
    type: ResponseWorkRequestDto,
  })
  async list() {
    return await this.service.list();
  }

  @Get("id/:id")
  @ApiBearerAuth()
  @ApiOperation({
    description: "Vistoria por ID.",
    summary: "Vistoria por ID.",
  })
  @ApiOkResponseDtoData({
    type: ResponseWorkRequestDto,
    description: "Vistoria por ID.",
  })
  @SerializeOptions({
    type: ResponseWorkRequestDto,
  })
  async getById(@Param("id") id: string) {
    return await this.service.findById(id);
  }

  @Get("user-id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  @ApiOperation({
    description: "Vistoria por usuario logado.",
    summary: "Vistoria por usuario logado.",
  })
  async getByUserId(@Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.getByUser(userId);
  }

  @Post("")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_inspection, EmployeeRoleEnum.manager_demand])
  @ApiOperation({
    description: "Registrar vistoria.",
    summary: "Registrar vistoria.",
  })
  @ApiOkResponseDtoData({
    type: ResponseWorkRequestDto,
    description: "Vistoria registrada.",
  })
  @ApiBody({
    type: CreateWorkRequestDto,
    required: true,
    description: "Construção a ser criado.",
  })
  async create(@Body() dto: CreateWorkRequestDto, @Req() req: Request) {
    const companyId = (req.user as JwtPayloadInterface).companyId;
    return await this.service.register(dto, companyId);
  }

  @Post("beneficiary")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  //@Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_inspection, EmployeeRoleEnum.manager_demand,])
  @ApiOperation({
    description: "Registrar vistoria beneficiario.",
    summary: "Registrar vistoria.",
  })
  @ApiOkResponseDtoData({
    type: ResponseWorkRequestDto,
    description: "Vistoria registrada.",
  })
  @ApiBody({
    type: CreateWorkRequestDto,
    required: true,
    description: "Construção a ser criado.",
  })
  async createBeneficiary(@Body() dto: CreateWorkRequestDto, @Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.registerBenefficiary(dto, userId);
  }

  @Put("id/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_inspection])
  @ApiOperation({
    description: "Atualizar vistoria.",
    summary: "Atualizar vistoria.",
  })
  @ApiOkResponseDtoData({
    type: ResponseWorkRequestDto,
    description: "Vistoria atualizada.",
  })
  @ApiBody({
    type: UpdateWorkRequestDto,
    required: true,
    description: "Construção a ser atualizado.",
  })
  @SerializeOptions({
    type: ResponseWorkRequestDto,
  })
  async update(@Param("id") id: string, @Body() dto: UpdateWorkRequestDto) {
    return await this.service.update(id, dto);
  }

  @Put("carry-out/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  // @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_inspection])
  //Retirei as roles, até ajustar o script do login.
  @ApiOkResponseDtoData({
    type: ResponseWorkRequestDto,
    description: "Pedido de demanda.",
  })
  async carryOut(@Param("id") id: string, @Req() req: Request) {
    const companyId = (req.user as JwtPayloadInterface).companyId;
    return await this.service.carryOut(id, companyId);
  }

  @Post("sustainability-itens/:workRequestId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_inspection, EmployeeRoleEnum.manager_demand])
  @ApiBody({
    type: SustainabilityItensRequestDto,
    required: true,
   })
  async createSustainabilityItens(@Body() dto: SustainabilityItensRequestDto, @Req() req: Request, @Param('workRequestId') workRequestId: string) {
    const userId = (req.user as JwtPayloadInterface).companyId;
    return await this.service.createSustainabilityItens(dto, userId, workRequestId);
  }
}