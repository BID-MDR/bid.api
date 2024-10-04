import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "../../../core/interfaces/jwt-payload.interface";
import { SatisfactionResearchService } from "./satisfaction-research.service";
import { CreateSatisfactionResearchDto } from "src/modules/data-interaction/database/dtos/satisfaction-research/create-satisfaction-research.dto";

@Controller("satisfaction-research")
@ApiTags("satisfaction-research/PesquisaSatisfacao")
export class SatisfactionResearchController {
  private readonly _logger = new Logger(SatisfactionResearchController.name);
  constructor(private service: SatisfactionResearchService) {}

  @Post("register/:workRequestId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async register(@Body() dto: any, @Req() req: Request, @Param('workRequestId') workRequestId: string) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.register(dto, userId, workRequestId);
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async list(){
    return await this.service.list()
  }

  @Delete('delete-by-id/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async delete(@Param('id') id: string){
    return await this.service.hardDelete(id)
  }

}
