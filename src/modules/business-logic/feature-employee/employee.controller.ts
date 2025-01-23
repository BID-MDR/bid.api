import { Body, Controller, Get, Logger, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "../../../core/interfaces/jwt-payload.interface";
import { EmployeeRegisterRequestDto } from "../../data-interaction/database/dtos/employee/employee-register-request.dto";
import { EmployeeService } from "./employee.service";

@Controller("employee")
@ApiTags("employee/Funcionario")
export class EmployeeController {
  private readonly _logger = new Logger(EmployeeController.name);
  constructor(private service: EmployeeService) {}

  @Post("register/:id")
  async register(@Param('id') id:string,  @Body() dto: EmployeeRegisterRequestDto) {
    console.log(id)
    return await this.service.register(dto, id);
  }

  @Put("active/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async activeEmployee(@Param("id") id: string, @Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.activeEmployee(id, userId);
  }

  @Put("role/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async updateRoleEmployee(@Param("id") id: string,@Body() roleId: any ,@Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.updateRole(id,roleId, userId);
  }

  @Put("role-aproved/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async updateRoleEmployeeAprove(@Param("id") id: string,@Body() roleId: any ,@Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.updateRoleAndActive(id,roleId, userId);
  }

  @Put("role-reject/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async updateRoleEmployeeReject(@Param("id") id: string,@Body() roleId: any ,@Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.updateRoleAndReject(id,roleId, userId);
  }

  @Get("")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async list() {
    return await this.service.list();
  }

  @Get("by-company")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async listByCompany(@Req() req: Request) {

    const companyId = (req.user as JwtPayloadInterface).companyId;

    return await this.service.listByCompany(companyId);
  }

}
