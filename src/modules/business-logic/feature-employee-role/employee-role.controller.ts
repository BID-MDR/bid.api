import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "../../../core/interfaces/jwt-payload.interface";
import { EmployeeRegisterRequestDto } from "../../data-interaction/database/dtos/employee/employee-register-request.dto";
import { EmployeeRoleService } from "./employee-role.service";
import { CreateEmployeeRoleDto } from "src/modules/data-interaction/database/dtos/employee-role/employee-role-create.dto";

@Controller("role-employee")
@ApiTags("role-employee/FuncaoFuncionario")
export class EmployeeRoleController {
  private readonly _logger = new Logger(EmployeeRoleController.name);
  constructor(private service: EmployeeRoleService) {}

  @Post("register")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async register(@Body() dto: CreateEmployeeRoleDto) {
    return await this.service.register(dto);
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async list(){
    return await this.service.list()
  }
  @Put("active-role/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async activeEmployee(@Param("id") id: string, @Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.activeRole(id, userId);
  }


  @Delete('delete-by-id/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async delete(@Param('id') id: string){
    return await this.service.hardDelete(id)
  }

}
