import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "src/core/dtos/response.dto";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { FeatureAuthService } from "src/modules/business-logic/feature-auth/feature-auth.service";
import { UserService } from "src/modules/backoffice/user/user.service";
import { EncryptInterceptor } from "src/core/interceptors/encrypt.interceptor";
import { CreateUserBackofficeDto } from "./dto/create-user-backoffice.dto";
import { UserRegisterPasswordDto } from "./dto/user-register-password.dto";
import { UserProgramTypeEnum } from "src/modules/data-interaction/database/enums/user-program-type.enum";


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

        const result = await this.UserService.findAllRegmel();
        return new ResponseDto(true, result, null);
    }
    @Get("professional-minha-casa")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getProfessionalBackofficeMinhaCasa() {

        const result = await this.UserService.findProfessionalBackofficeMinhaCasa();
        return new ResponseDto(true, result, null);
    }

    @Get("list-mcmv")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getMcmv() {

        const result = await this.UserService.findAllMinhaCasa();
        return new ResponseDto(true, result, null);
    }

    @Get("by-id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getUser(@Param('id') id: string) {

        const result = await this.UserService.findById(id);
        return new ResponseDto(true, result, null);
    }

    @Get("by-email/:email")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getUserEmail(@Param('email') email: string) {

        const result = await this.UserService.getByEmail(email);
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

    @Post("Regmel")
    @UseInterceptors(new EncryptInterceptor())
    async createRegmel(@Body() body: CreateUserBackofficeDto) {
        body.programType = UserProgramTypeEnum.REGMEL
        return await this.UserService.create(body);
    }

    @Post("MinhaCasa")
    @UseInterceptors(new EncryptInterceptor())
    async createMinhaCasa(@Body() body: CreateUserBackofficeDto) {
        body.programType = UserProgramTypeEnum.MINHA_CASA
        return await this.UserService.create(body);
    }

    @Post('first-access/:_id')
    async firstAccess(
      @Param('_id') _id: string,
      @Body()
      dto: UserRegisterPasswordDto,
    ) {
      const response = await this.UserService.firstAccess(_id, dto);
      return new ResponseDto(true, response, null);
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

    @Get("get-programs-numbers")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async searchDataForResearchManagerPage() {

        const result = await this.UserService.getDataForResearchManagerPage();
        return new ResponseDto(true, result, null);
    }

}