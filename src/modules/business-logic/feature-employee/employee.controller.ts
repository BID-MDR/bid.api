import { Body, Controller, Logger, Post, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EmployeeService } from "./employee.service";
import { JwtPayloadInterface } from "../../../core/interfaces/jwt-payload.interface";
import { Request } from "express";
import { ApiOkResponseDtoData } from "../../../core/decorators/swagger/api-ok-response-dto.decorator";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { EmployeeRegisterRequestDto } from "../../data-interaction/database/dtos/employee/employee-register-request.dto";

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
}
