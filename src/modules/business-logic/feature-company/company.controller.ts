import { Body, Controller, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CompanyService } from "./company.service";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "../../../core/interfaces/jwt-payload.interface";
import { Request } from "express";

@Controller("company")
@ApiTags("company/Empresa")
export class CompanyController {
  private readonly _logger = new Logger(CompanyController.name);
  constructor(private service: CompanyService) {}

  @Post("register")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async register(@Body() dto: any, @Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    // return await this.service.register(dto, userId);
    throw new Error("Method not implemented.");
  }
}
