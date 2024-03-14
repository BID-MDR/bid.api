import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    SerializeOptions,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiBodyEncripted } from 'src/core/decorators/swagger/api-body-encripted.decorator';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { JwtAccessTokenGuard } from 'src/core/guards/jwt-access-token.guard';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { UserResponseDto } from 'src/modules/data-interaction/database/dtos/user/reponse-user.dto';
import { UpdateUserDto } from 'src/modules/data-interaction/database/dtos/user/update-user.dto';
import { ConfirmPasswordUpdateRequestDto } from './dtos/confirm-password-update.request.dto';
import { ProfessionalCouncilRegistrationResponseDto } from './dtos/professional-council-resgistration-reponse.dto';
import { ProfessionalCouncilRegistrationRequestDto } from './dtos/professional-council-resgistration-request.dto';
import { TokenVerifyParamsDto } from './dtos/token-verify-params.dto';
import { TokenVerifyReponseDto } from './dtos/token-verify-reponse.dto';
import { FeatureUserService } from './feature-user.service';
import { FeatureAuthService } from '../feature-auth/feature-auth.service';
import { SigninResponseDto } from '../feature-auth/dtos/signin-response.dto';

@Controller('user')
@ApiTags('User/Usuário')
export class FeatureUserController {
    constructor(private featureUserService: FeatureUserService, private featureAuthService: FeatureAuthService) {}

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna o usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Retorna o usuário logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: 'Usuário logado que iniciou a requisição.',
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureUserService.findById(userId);
    }

    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna o usuário e sua agenda, caso exista.',
        summary: 'Retorna o usuário pelo ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do usuário.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: 'Usuário logado que iniciou a requisição.',
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getById(@Param('id') userId: string) {
        return await this.featureUserService.findById(userId);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Enpoint único para registrar beneficiário ou profissional.',
        summary: 'Cria um usuário de ambos os tipos.',
    })
    @ApiBodyEncripted({
        type: CreateUserDto,
        required: true,
        description: 'Usuário a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: SigninResponseDto,
        description: 'Token de acesso.',
    })
    @SerializeOptions({
        type: SigninResponseDto,
    })
    async create(@Body() body: CreateUserDto) {
        const user = await this.featureUserService.create(body);
        return await this.featureAuthService.signinFromCreateUser(user);
    }

    @Post('password/update/request')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria um código de 6 dígitos e manda para o email cadastrado do usuário que iniciou a requisição.',
        summary: 'Método para usuário logado. Inicia a requisição de alteração de senha e envia um código.',
    })
    @ApiOkResponseDtoData({
        type: null,
    })
    async updatePasswordRequest(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;

        await this.featureUserService.updatePasswordRequest(userId);
    }

    @Post('password/update/verify/token/:token')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        description:
            'Verifica a validade do código de autenticação informado no parâmetro usando o ID do usuário contido no JWT para identificação no banco.',
        summary: 'Método para usuário logado. Verifica a validade do código de alteração de senha.',
    })
    @ApiParam({
        name: 'token',
        description: 'Código de autenticação de 6 dígitos.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: TokenVerifyReponseDto,
    })
    @SerializeOptions({
        type: TokenVerifyReponseDto,
    })
    async verifyUpdatePasswordRequest(@Req() req: Request, @Param() paramDto: TokenVerifyParamsDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureUserService.verifyToken(userId, paramDto.token);
    }

    @Post('password/update/confirm')
    @UseInterceptors(new EncryptInterceptor())
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Altera a senha do usuário que iniciou a requisição.',
        summary: 'Método para usuário logado. Finaliza a requisição de alteração de senha.',
    })
    @ApiOkResponseDtoData({
        type: null,
    })
    @ApiBodyEncripted({
        type: ConfirmPasswordUpdateRequestDto,
        required: true,
        description: 'Usuário a ser atualizado.',
    })
    async confirmUpdatePasswordRequest(@Req() req: Request, @Body() dto: ConfirmPasswordUpdateRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureUserService.confirmUpdatePasswordRequest(userId, dto);
    }
@Get('dashboard/beneficiary/id/:id')
    @ApiOperation({
        description: 'Retorna os dados necessarios do usuario para o perfil beneficiario dashboard',
        summary: 'Retorna dados do usuario beneficiario e joins.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do usuário.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: 'Usuário logado que iniciou a requisição.',
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getDashboardDataBeneficiary(@Param('id') userId: string) {
        // Example of performing a join to fetch additional data from other tables
        const userData = await this.featureUserService.getDashboardDataWithJoinBeneficiary(userId);
        return userData;
    }

    @Get('dashboard/professional/id/:id')
    @ApiOperation({
        description: 'Retorna os dados necessarios do usuario para o perfil beneficiario dashboard',
        summary: 'Retorna dados do usuario beneficiario e joins.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do usuário.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: 'Usuário logado que iniciou a requisição.',
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async getDashboardDataProfessional(@Param('id') userId: string) {
        // Example of performing a join to fetch additional data from other tables
        const userData = await this.featureUserService.getDashboardDataWithJoinProfessional(userId);
        return userData;
    }
    @Put('')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Enpoint único para Atualizar beneficiário ou profissional.',
        summary: 'Atualiza um usuário de ambos os tipos.',
    })
    @ApiBodyEncripted({
        type: UpdateUserDto,
        required: true,
        description: 'Usuário a ser atualizado.',
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description: 'Usuário atualizado.',
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async update(@Req() req: Request, @Body() body: UpdateUserDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureUserService.update(userId, body);
    }

    @Get('caubr/check-professional-status/cpf/:cpf')
    @ApiParam({
        name: 'cpf',
        description: 'CPF do usuário.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOperation({
        description: 'Necessário para cadastrar o usuário profissional arquiteto/urbanista na plataforma.',
        summary: 'Retorna o status do registro de um cpf no CAUBR.',
    })
    @ApiOkResponseDtoData({
        type: ProfessionalCouncilRegistrationResponseDto,
        description:
            'Retorna o status do registro do profissional no CAUBR e se existe um registro para o CPF informado.',
    })
    @SerializeOptions({
        type: ProfessionalCouncilRegistrationResponseDto,
    })
    async checkProfessionalUserCaubRegistration(@Param() reqParams: ProfessionalCouncilRegistrationRequestDto) {
        return await this.featureUserService.checkProfessionalUserCaubRegistration(reqParams.cpf);
    }

    @Get('confea/check-professional-status/cpf/:cpf')
    @ApiParam({
        name: 'cpf',
        description: 'CPF do usuário.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOperation({
        description:
            'Necessário para cadastrar o usuário profissional [Engenheiro Civil, Engenheiro Civil e Ambiental, Tecnólogo em Construção Civil, Tecnólogo em Construção Civil - Edificações] na plataforma.',
        summary: 'Retorna o status do registro de um cpf no CONFEA.',
    })
    @ApiOkResponseDtoData({
        type: ProfessionalCouncilRegistrationResponseDto,
        description:
            'Retorna o status do registro do profissional no CONFEA e se existe um registro para o CPF informado.',
    })
    @SerializeOptions({
        type: ProfessionalCouncilRegistrationResponseDto,
    })
    async checkProfessionalUserConfeaRegistration(@Param() reqParams: ProfessionalCouncilRegistrationRequestDto) {
        return await this.featureUserService.checkProfessionalUserConfeaRegistration(reqParams.cpf);
    }
        @Get('profile/beneficiary/work-request/:id')
    @ApiParam({
        name: 'id',
        description: 'ID do usuário.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOperation({
        description: 'Pega dados do usuario logado relacionados a work-request para serem mostrados',
        summary: 'Retorna dados da carteira vinculados com o usuarios para perfil beneficiario',
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description:
            'Retorna dados para serem exibidos na pagina perfil.',
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async profileBalanceGetBeneficiary(@Param() reqParams: UserResponseDto) {
        return await this.featureUserService.profileBalanceGetBeneficiary(reqParams.id);
    }

    @Get('profile/professional/work-request/:id')
    @ApiParam({
        name: 'id',
        description: 'ID do usuário.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOperation({
        description: 'Pega dados do usuario logado relacionados a work-request para serem mostrados',
        summary: 'Retorna dados da carteira vinculados com o usuarios para perfil professional',
    })
    @ApiOkResponseDtoData({
        type: UserResponseDto,
        description:
            'Retorna dados para serem exibidos na pagina perfil.',
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async profileBalanceGetProfessional(@Param() reqParams: UserResponseDto) {
        return await this.featureUserService.profileBalanceGetProfessional(reqParams.id);
    }
}
