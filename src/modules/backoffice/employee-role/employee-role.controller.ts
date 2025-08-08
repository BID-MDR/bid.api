import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "../../../core/interfaces/jwt-payload.interface";
import { EmployeeRoleBackofficeService } from "./employee-role.service";
import { CreateEmployeeRoleDto } from "src/modules/data-interaction/database/dtos/employee-role/employee-role-create.dto";
import { RolesBackofficeGuard } from "src/core/guards/roles-backoffice.guard";
import { Roles } from "src/core/decorators/roles-backoffice.decorator";
import { FunctionTypeEnum } from "../user/dto/functionTypeEnum";

@Controller("role-employee-backoffice")
@ApiTags("Role-employee Backoffice")
export class EmployeeRoleBackofficeController {
  private readonly _logger = new Logger(EmployeeRoleBackofficeController.name);
  constructor(private service: EmployeeRoleBackofficeService) {}

  @Post("register")
  @UseGuards(JwtAccessTokenGuard)
  
  async register(@Body() dto: CreateEmployeeRoleDto) {
    return await this.service.register(dto);
  }

  @Get('')
  @UseGuards(JwtAccessTokenGuard)
  
  async list(){
    return await this.service.list()
  }


//   @Put("active-role/:id")
//   @ApiBearerAuth()
//   @UseGuards(JwtAccessTokenGuard)
//   async activeEmployee(@Param("id") id: string, @Req() req: Request) {
//     const userId = (req.user as JwtPayloadInterface).userId;
//     return await this.service.activeRole(id, userId);
//   }


//   @Delete('delete-by-id/:id')
//   @ApiBearerAuth()
//   @UseGuards(JwtAccessTokenGuard)
//   async delete(@Param('id') id: string){
//     return await this.service.hardDelete(id)
//   }

}
