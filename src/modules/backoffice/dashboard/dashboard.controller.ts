import { Controller, Logger, Get, UseGuards, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/core/decorators/roles.decorator";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { RolesBackofficeGuard } from "src/core/guards/roles-backoffice.guard";
import { EmployeeBackofficeService } from "../employee/employee.service";
import { FunctionTypeEnum } from "../user/dto/functionTypeEnum";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard-backoffice")
@ApiTags("Dashboard Backoffice")
export class DashboardController {
  private readonly _logger = new Logger(DashboardController.name);
  constructor(private service: DashboardService) {}


  @Get("")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async list() {
    return await this.service.getCharts();
  }

  @Get("userdata/:month")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async userData(@Param('month') month: number) {
    return await this.service.getDadosUsuario(month);
  }

  @Get("userdata-mcmv/:month")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async userDataMcmv(@Param('month') month: number) {
    return await this.service.getDadosUsuarioMcmv(month);
  }

//   @Get("by-id/:id")
//   @ApiBearerAuth()
//   @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
//   @Roles([FunctionTypeEnum.GERIR_AGENTE_PROMOTOR])
//   async getById(@Param('id') id: string) {
//     return await this.service.getById(id);
//   }


}