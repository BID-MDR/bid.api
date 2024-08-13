import { Controller, Logger, Get, UseGuards, Post, UseInterceptors, Body, Put, Delete, Param, BadRequestException } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ResponseDto } from "src/core/dtos/response.dto";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { EncryptInterceptor } from "src/core/interceptors/encrypt.interceptor";
import { FeatureAuthService } from "src/modules/business-logic/feature-auth/feature-auth.service";
import { CreateUserBackofficeDto } from "../user/dto/create-user-backoffice.dto";
import { UserRoleService } from "./user-roles.service";
import { CreateUserBackofficeRoleDto } from "./dto/create-role-backoffice.dto";

@Controller("backoffice-user-roles")
@ApiTags("Funcoes Backoffice")
export class UserRoleBackofficeController {
    private readonly _logger = new Logger(UserRoleBackofficeController.name);

    constructor(
        private UserRoleService: UserRoleService,
        private featureAuthService: FeatureAuthService,
    ) { }

    @Post("register")
    @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async register(@Body() dto: any) {
      let role = await this.UserRoleService.findByName(dto.role);
      if(role)
        throw new BadRequestException("Role ja existe");
      else
        return await this.UserRoleService.create(dto);
    }
  
    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async list(){
      return await this.UserRoleService.list()
    }
    
    @Put("active-role/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async activeEmployee(@Param("id") id: string) {
      return await this.UserRoleService.activeRole(id);
    }
  
  
    @Delete('delete-by-id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async delete(@Param('id') id: string){
      return await this.UserRoleService.hardDelete(id)
    }
}