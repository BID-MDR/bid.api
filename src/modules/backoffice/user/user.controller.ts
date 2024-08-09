import { Controller, Get, Logger, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "src/core/dtos/response.dto";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { FeatureAuthService } from "src/modules/business-logic/feature-auth/feature-auth.service";
import { UserService } from "src/modules/backoffice/user/user.service";


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

}