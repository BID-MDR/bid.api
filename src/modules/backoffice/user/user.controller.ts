import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "src/core/dtos/response.dto";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { FeatureAuthService } from "src/modules/business-logic/feature-auth/feature-auth.service";
import { UserService } from "src/modules/backoffice/user/user.service";
import { EncryptInterceptor } from "src/core/interceptors/encrypt.interceptor";
import { CreateUserBackofficeDto } from "./dto/create-user-backoffice.dto";


@Controller("backoffice-user")
@ApiTags("Usuário Backoffice")
export class UserBackofficeController {
    private readonly _logger = new Logger(UserBackofficeController.name);

    constructor(
        private UserService: UserService,
        private featureAuthService: FeatureAuthService,
    ) { }

    @Get("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getUsers() {

        const result = await this.UserService.findAll();
        return new ResponseDto(true, result, null);
    }


    @Get("authenticated")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getAuthenticated(@Req() request) {
        const response = await this.UserService.getByPayload(request.user);
        return new ResponseDto(true, response, null);
      }

    @Post("")
    @UseInterceptors(new EncryptInterceptor())
    async create(@Body() body: CreateUserBackofficeDto) {
        return await this.UserService.create(body);
    }

    @Put("update/:id")
    @UseInterceptors(new EncryptInterceptor())
    async update(@Param('id') id: string, @Body() body: CreateUserBackofficeDto) {
        return await this.UserService.update(id,body);
    }


    @Delete("delete/:id")
    @UseInterceptors(new EncryptInterceptor())
    async delete(@Param('id') id: string) {
        return await this.UserService.hardDelete(id);
    }

}