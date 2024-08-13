import { Body, Controller, Get, Logger, Post, UseGuards, UseInterceptors } from "@nestjs/common";
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


    @Post("")
    @UseInterceptors(new EncryptInterceptor())
    async create(@Body() body: CreateUserBackofficeDto) {
        return await this.UserService.create(body);
    }

}