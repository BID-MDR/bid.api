import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompanyService } from "./company.service";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { CreateCompanyDto } from "src/modules/data-interaction/database/dtos/company/create-company.dto";

@Controller("company")
@ApiTags("company/Empresa")
export class CompanyController {
  private readonly _logger = new Logger(CompanyController.name);
  constructor(private service: CompanyService) {}

  @Post("register")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async register(@Body() dto: CreateCompanyDto) {
    return await this.service.register(dto);
  }


  @Get("")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async list() {
    return await this.service.list();
  }

  @Get("by-owner/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async getByOwner(@Param('id') id: string) {
    return await this.service.getByOwner(id);
  }

  @Delete("by-id/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
