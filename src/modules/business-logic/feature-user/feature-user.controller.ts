import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Param,
    Post,
    Put,
    Req,
    SerializeOptions,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";
import { Request } from "express";
import { ApiBodyEncripted } from "src/core/decorators/swagger/api-body-encripted.decorator";
import { ApiOkResponseDtoData } from "src/core/decorators/swagger/api-ok-response-dto.decorator";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { EncryptInterceptor } from "src/core/interceptors/encrypt.interceptor";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { CreateUserDto } from "src/modules/data-interaction/database/dtos/user/create-user.dto";
import { UserResponseDto } from "src/modules/data-interaction/database/dtos/user/reponse-user.dto";
import { UpdateUserDto } from "src/modules/data-interaction/database/dtos/user/update-user.dto";
import { ConfirmPasswordUpdateRequestDto } from "./dtos/confirm-password-update.request.dto";
import { ProfessionalCouncilRegistrationResponseDto } from "./dtos/professional-council-resgistration-reponse.dto";
import { ProfessionalCouncilRegistrationRequestDto } from "./dtos/professional-council-resgistration-request.dto";
import { TokenVerifyParamsDto } from "./dtos/token-verify-params.dto";
import { TokenVerifyReponseDto } from "./dtos/token-verify-reponse.dto";
import { FeatureUserService } from "./feature-user.service";
import { FeatureAuthService } from "../feature-auth/feature-auth.service";
import { SigninResponseDto } from "../feature-auth/dtos/signin-response.dto";
import { UpdateUserProgramTypeDto } from "src/modules/data-interaction/database/dtos/user/update-user-program-type.dto";
import { ResponseDto } from "src/core/dtos/response.dto";
import { CreateAddressDto } from "src/modules/data-interaction/database/dtos/address/create-address.dto";
import { UpdateAddressDto } from "src/modules/data-interaction/database/dtos/address/update-address.dto";
import { CreateUserGeneratedMediaDto } from "src/modules/data-interaction/database/dtos/user/user-generated-media/create-user-generated-media.dto";
import { MediaUploadDto } from "src/modules/data-interaction/database/dtos/media/media-upload.dto";
import { CreateUserRestingDayDto } from "src/modules/data-interaction/database/dtos/user/user-resting-day/create-user-resting-day.dto";

@Controller("user")
@ApiTags("User/Usuário")
export class FeatureUserController {
    private readonly _logger = new Logger(FeatureUserController.name);

    constructor(
        private featureUserService: FeatureUserService,
        private featureAuthService: FeatureAuthService,
    ) { }

    @Get("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description:
            "Retorna o usuário logado que iniciou a requisição através do JWT no header.",
        summary: "Retorna o usuário logado que iniciou a requisição.",
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const result = await this.featureUserService.getById(userId);
        return new ResponseDto(true, result, null);
    }

    @Get("get-beneficiary")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getAllBeneficiary(@Req() req: Request) {
        const result = await this.featureUserService.listBeneficiary();
        return new ResponseDto(true, result, null);
    }

    @Get("get-month-beneficiary/:month")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getBeneficiaryByMonth(@Param('month') month:number) {
        const result = await this.featureUserService.listBeneficiaryByMonth(month);
        return new ResponseDto(true, result, null);
    }

    @Get("id/:id")
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Retorna o usuário e sua agenda, caso exista.",
        summary: "Retorna o usuário pelo ID.",
    })
    @ApiParam({
        name: "id",
        description: "ID do usuário.",
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getById(@Param("id") userId: string) {
        const us = await this.featureUserService.getById(userId);
        return new ResponseDto(true, us, false);
    }

    @Get("look-for-professional")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
   
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getLookForProfessional(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const resultUser = await this.featureUserService.findById(userId);
        
        const result = await this.featureUserService.findNearbyEmployees(Number(resultUser.address.latitude), Number(resultUser.address.longitude))
      
        return new ResponseDto(true, result, false);
    }

    @Get("look-for-beneficiary")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
   
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getLookForBeneficiary(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const resultUser = await this.featureUserService.findById(userId);
        
        const result = await this.featureUserService.findNearbyBeneficiary(Number(resultUser.address.latitude), Number(resultUser.address.longitude), resultUser.address.maximumDistanceToWorks)

        return new ResponseDto(true, result, false);
    }

    @Post("")
    async create(@Body() body: CreateUserDto) {
        try {
            console.log('inicio da controlle body', body);
            if (body.type === 'PROFISSIONAL' && body.programType === 'MINHA_CASA') {
                if (body.professionalUserInfo?.restingDays) {
                    body.professionalUserInfo.restingDays = body.professionalUserInfo.restingDays.map((day) => {
                        const restingDay = new CreateUserRestingDayDto();
                        restingDay.day = day.day;
                        return restingDay;
                    });
                }
            }
    
            const user = await this.featureUserService.createTeste(body);
            console.log('Usuário criado com sucesso:', user);
    
            console.log('🔑 Gerando token de autenticação...');
           // const authResponse = await this.featureAuthService.signinFromCreateUser(user);
            //console.log('Token gerado com sucesso:', authResponse);
    
            return user;
        } catch (error) {
            console.error('❌ Erro no cadastro de usuário:', error);
    
            throw new BadRequestException(error.message || 'Erro ao criar usuário');
        }
    }
    

    @Get("password/update/request")
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description:
            "Cria um código de 6 dígitos e manda para o email cadastrado do usuário que iniciou a requisição.",
        summary:
            "Método para usuário logado. Inicia a requisição de alteração de senha e envia um código.",
    })
    @ApiOkResponseDtoData({
        type: null,
    })
    async updatePasswordRequest(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;

        await this.featureUserService.updatePasswordRequest(userId);
    }

    @Post("password/update/verify/token")
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        description:
            "Verifica a validade do código de autenticação informado no parâmetro usando o ID do usuário contido no JWT para identificação no banco.",
        summary:
            "Método para usuário logado. Verifica a validade do código de alteração de senha.",
    })
    @ApiParam({
        name: "token",
        description: "Código de autenticação de 6 dígitos.",
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: TokenVerifyReponseDto,
    })
    @SerializeOptions({
        type: TokenVerifyReponseDto,
    })
    async verifyUpdatePasswordRequest(
        @Req() req: Request,
        @Body() paramDto: TokenVerifyParamsDto,
    ) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureUserService.verifyToken(
            userId,
            paramDto.token,
        );
    }

    @Post("password/update/confirm")
    @UseInterceptors(new EncryptInterceptor())
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Altera a senha do usuário que iniciou a requisição.",
        summary:
            "Método para usuário logado. Finaliza a requisição de alteração de senha.",
    })
    @ApiOkResponseDtoData({
        type: null,
    })
    @ApiBodyEncripted({
        type: ConfirmPasswordUpdateRequestDto,
        required: true,
        description: "Usuário a ser atualizado.",
    })
    async confirmUpdatePasswordRequest(
        @Req() req: Request,
        @Body() dto: ConfirmPasswordUpdateRequestDto,
    ) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureUserService.confirmUpdatePasswordRequest(
            userId,
            dto,
        );
    }

    @Get("dashboard/professional/id/:id")
    @ApiOperation({
        description:
            "Retorna os dados necessarios do usuario para o perfil profisional dashboard",
        summary: "Retorna dados do usuario profisional e joins.",
    })
    @ApiParam({
        name: "id",
        description: "ID do usuário.",
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getDashboardDataWithJoinProfessional(@Param("id") userId: string) {
        // Example of performing a join to fetch additional data from other tables
        const userData =
            await this.featureUserService.getDashboardDataWithJoinProfessional(
                userId,
            );
        return userData;
    }

    @Get("dashboard/beneficiary/id/:id")
    @ApiOperation({
        description:
            "Retorna os dados necessarios do usuario para o perfil beneficiario dashboard",
        summary: "Retorna dados do usuario beneficiario e joins.",
    })
    @ApiParam({
        name: "id",
        description: "ID do usuário.",
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: "Usuário logado que iniciou a requisição.",
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getDashboardDataBeneficiary(@Param("id") userId: string) {
        // Example of performing a join to fetch additional data from other tables
        const userData =
            await this.featureUserService.getDashboardDataWithJoinBeneficiary(
                userId,
            );
        return userData;
    }

    @Put()
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description:
            "Enpoint único para Atualizar beneficiário ou profissional.",
        summary: "Atualiza um usuário de ambos os tipos.",
    })
    @ApiBodyEncripted({
        type: UpdateUserDto,
        required: true,
        description: "Usuário a ser atualizado.",
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: "Usuário atualizado.",
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async update(@Req() req: Request, @Body() body: UpdateUserDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureUserService.update(userId, body);
    }

    @Put('personal-info')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    async updatePersonalInfo(@Req() req: Request, @Body() body: UpdateUserDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const result = await this.featureUserService.update(userId, body);
        return new ResponseDto(true, result, null);
    }

    @Put('picture-profile')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    async pictureProfile(@Req() req: Request, @Body() body: MediaUploadDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const result = await this.featureUserService.updateProfilePicture(userId, body);
        return new ResponseDto(true, result, null);
    }

    @Put('address')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    async updateAdrress(@Body() body: UpdateAddressDto) {
        const result = await this.featureUserService.updateAddress(body);
        return new ResponseDto(true, result, null);
    }

    @Put("by-id/:id")
    // @UseGuards(JwtAccessTokenGuard)
    // @ApiBearerAuth()
    // @UseInterceptors(new EncryptInterceptor())
    async updateById(@Param("id") id: string, @Body() body: any) {
        return await this.featureUserService.updateById(id, body);
    }

    @Put("update-user-program-type/:id")
    // @UseGuards(JwtAccessTokenGuard)
    // @ApiBearerAuth()
    // @UseInterceptors(new EncryptInterceptor())
    async updateUserProgramType(
        @Param("id") id: string,
        @Body() body: UpdateUserProgramTypeDto,
    ) {
        return await this.featureUserService.updateUserProgramTypeDto(id, body);
    }

    @Get("caubr/check-professional-status/cpf/:cpf")
    @ApiParam({
        name: "cpf",
        description: "CPF do usuário.",
        required: true,
        allowEmptyValue: false,
    })
    @ApiOperation({
        description:
            "Necessário para cadastrar o usuário profissional arquiteto/urbanista na plataforma.",
        summary: "Retorna o status do registro de um cpf no CAUBR.",
    })
    @ApiOkResponseDtoData({
        type: ProfessionalCouncilRegistrationResponseDto,
        description:
            "Retorna o status do registro do profissional no CAUBR e se existe um registro para o CPF informado.",
    })
    @SerializeOptions({
        type: ProfessionalCouncilRegistrationResponseDto,
    })
    async checkProfessionalUserCaubRegistration(
        @Param() reqParams: ProfessionalCouncilRegistrationRequestDto,
    ) {
        return await this.featureUserService.checkProfessionalUserCaubRegistration(
            reqParams.cpf,
        );
    }

    @Get("confea/check-professional-status/cpf/:cpf")
    @ApiParam({
        name: "cpf",
        description: "CPF do usuário.",
        required: true,
        allowEmptyValue: false,
    })
    @ApiOperation({
        description:
            "Necessário para cadastrar o usuário profissional [Engenheiro Civil, Engenheiro Civil e Ambiental, Tecnólogo em Construção Civil, Tecnólogo em Construção Civil - Edificações] na plataforma.",
        summary: "Retorna o status do registro de um cpf no CONFEA.",
    })
    @ApiOkResponseDtoData({
        type: ProfessionalCouncilRegistrationResponseDto,
        description:
            "Retorna o status do registro do profissional no CONFEA e se existe um registro para o CPF informado.",
    })
    @SerializeOptions({
        type: ProfessionalCouncilRegistrationResponseDto,
    })
    async checkProfessionalUserConfeaRegistration(
        @Param() reqParams: ProfessionalCouncilRegistrationRequestDto,
    ) {
        return await this.featureUserService.checkProfessionalUserConfeaRegistration(
            reqParams.cpf,
        );
    }



    // @Get("profile/beneficiary/work-request/:id")
    // @ApiParam({
    //     name: "id",
    //     description: "ID do usuário.",
    //     required: true,
    //     allowEmptyValue: false,
    // })
    // @ApiOperation({
    //     description:
    //         "Pega dados do usuario logado relacionados a work-request para serem mostrados",
    //     summary:
    //         "Retorna dados da carteira vinculados com o usuarios para perfil beneficiario",
    // })
    // @ApiOkResponseDtoData({
    //     type: UserResponseDto,
    //     description: "Retorna dados para serem exibidos na pagina perfil.",
    // })
    // @SerializeOptions({
    //     type: UserResponseDto,
    // })
    // async profileBalanceGetBeneficiary(@Param() reqParams: UserResponseDto) {
    //     return await this.featureUserService.profileBalanceGetBeneficiary(
    //         reqParams.id,
    //     );
    // }

    // @Get('profile/professional/work-request/:id')
    // @ApiParam({
    //     name: 'id',
    //     description: 'ID do usuário.',
    //     required: true,
    //     allowEmptyValue: false,
    // })
    // @ApiOperation({
    //     description: 'Pega dados do usuario logado relacionados a work-request para serem mostrados',
    //     summary: 'Retorna dados da carteira vinculados com o usuarios para perfil professional',
    // })
    // @ApiOkResponseDtoData({
    //     type: UserResponseDto,
    //     description:
    //         'Retorna dados para serem exibidos na pagina perfil.',
    // })
    // @SerializeOptions({
    //     type: UserResponseDto,
    // })
    // async profileBalanceGetProfessional(@Param() reqParams: UserResponseDto) {
    //     return await this.featureUserService.profileBalanceGetProfessional(reqParams.id);
    // }

    @Get("by-cpf/:cpf")
    async getByCpf(@Param("cpf") cpf: string) {
        return await this.featureUserService.getByCpf(cpf);
    }

    @Get("professional-appoitment/:professionalId")
    async listAppoitmentByProfessionalId(@Param("professionalId") professionalId: string) {
        return await this.featureUserService.listAppoitmentByProfessionalId(professionalId);
    }
}
 