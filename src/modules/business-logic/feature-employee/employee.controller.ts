import { Body, Controller, Logger, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
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

  @Post("register")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async register(@Body() dto: EmployeeRegisterRequestDto, @Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.register(dto, userId);
  }

  @Put("active/:id")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async activeEmployee(@Param("id") id: string, @Req() req: Request) {
    const userId = (req.user as JwtPayloadInterface).userId;
    return await this.service.activeEmployee(id, userId);
  }

}
