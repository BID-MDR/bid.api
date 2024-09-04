import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "../../../core/interfaces/jwt-payload.interface";
import { SatisfactionResearchBackofficeService } from "./satisfaction-research.service";
import { RolesBackofficeGuard } from "src/core/guards/roles-backoffice.guard";
import { Roles } from "src/core/decorators/roles-backoffice.decorator";
import { FunctionTypeEnum } from "../user/dto/functionTypeEnum";

@Controller("satisfaction-research-backoffice")
@ApiTags("satisfaction-research Backoffice")
export class SatisfactionResearchBackofficeController {
  private readonly _logger = new Logger(SatisfactionResearchBackofficeController.name);
  constructor(private service: SatisfactionResearchBackofficeService) {}

  @Post("register/:workRequestId")
  @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.PESQUISAS])
  async register(@Body() dto: any, @Req() req: Request, @Param('workRequestId') workRequestId: string) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.register(dto, userId, workRequestId);
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.PESQUISAS])
  async list(){
    return await this.service.list()
  }

  @Get('beneficiary')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.PESQUISAS])
  async listBeneficiary(){
    return await this.service.listBeneficiary()
  }

  @Get('beneficiary/:month')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.PESQUISAS])
  async listBeneficiaryMonth(@Param('month') month: number){
    return await this.service.listBeneficiaryMonth(month)
  }

  @Get('professional')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.PESQUISAS])
  async listProfessional(){
    return await this.service.listProfessional()
  }

  @Get('professional/:month')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
  @Roles([FunctionTypeEnum.PESQUISAS])
  async listProfessionalMonth(@Param('month') month: number){
    return await this.service.listProfessionalMonth(month)
  }




  @Delete('delete-by-id/:id')
  @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.PESQUISAS])
  async delete(@Param('id') id: string){
    return await this.service.hardDelete(id)
  }

}
