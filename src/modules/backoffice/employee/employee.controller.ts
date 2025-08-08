import { Body, Controller, Get, Logger, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "../../../core/interfaces/jwt-payload.interface";
import { EmployeeRegisterRequestDto } from "../../data-interaction/database/dtos/employee/employee-register-request.dto";
import { EmployeeBackofficeService } from "./employee.service";
import { RolesBackofficeGuard } from "src/core/guards/roles-backoffice.guard";
import { Roles } from "src/core/decorators/roles-backoffice.decorator";
import { FunctionTypeEnum } from "../user/dto/functionTypeEnum";

@Controller("employee-backoffice")
@ApiTags("Employee Backoffice")
export class EmployeeBackofficeController {
  private readonly _logger = new Logger(EmployeeBackofficeController.name);
  constructor(private service: EmployeeBackofficeService) { }

  //   @Post("register")
  //   @ApiBearerAuth()
  //   @UseGuards(JwtAccessTokenGuard)
  //   async register(@Body() dto: EmployeeRegisterRequestDto, @Req() req: Request) {
  //     const userId = (req.user as JwtPayloadInterface).userId;
  //     return await this.service.register(dto, userId);
  //   }

  //   @Put("active/:id")
  //   @ApiBearerAuth()
  //   @UseGuards(JwtAccessTokenGuard)
  //   async activeEmployee(@Param("id") id: string, @Req() req: Request) {
  //     const userId = (req.user as JwtPayloadInterface).userId;
  //     return await this.service.activeEmployee(id, userId);
  //   }

  @Get("")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
    async list() {
    return await this.service.list();
  }

  @Get("by-id/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
    async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Get("by-id-full/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
    async getByIdFull(@Param('id') id: string) {
    return await this.service.getByIdFull(id);
  }


}
