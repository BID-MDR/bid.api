import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompanyBackofficeService } from "./company.service";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { CreateCompanyDto } from "src/modules/data-interaction/database/dtos/company/create-company.dto";
import { RolesBackofficeGuard } from "src/core/guards/roles-backoffice.guard";
import { FunctionTypeEnum } from "../user/dto/functionTypeEnum";
import { Roles } from "src/core/decorators/roles-backoffice.decorator";
import { UserBackofficeTypeEnum } from "src/modules/backoffice/user/dto/userTypeEnum";

@Controller("company-backoffice")
@ApiTags("Company Backoffice")
export class CompanyBackofficeController {
  private readonly _logger = new Logger(CompanyBackofficeController.name);
  constructor(private service: CompanyBackofficeService) { }

  @Post("register")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.GERIR_EMPRESAS])
  async register(@Body() dto: CreateCompanyDto) {
    return await this.service.register(dto);
  }


  @Get("")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.GERIR_EMPRESAS])
  async list() {
    return await this.service.list();
  }

  @Get("get-month/:month")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async listByMonth(@Param('month') month) {
    return await this.service.listByMonth(month);
  }

  @Get("by-id/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.GERIR_EMPRESAS, FunctionTypeEnum.VISUALIZADOR])
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Get("by-owner/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.GERIR_EMPRESAS])
  async getByOwner(@Param('id') id: string) {
    return await this.service.getByOwner(id);
  }

  @Get("by-employee/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.GERIR_EMPRESAS])
  async getByEmployee(@Param('id') id: string) {
    return await this.service.getByEmployee(id);
  }

  @Delete("by-id/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.GERIR_EMPRESAS])
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
