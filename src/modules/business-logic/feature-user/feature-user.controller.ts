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
import { ProfessionalCouncilRegistrationResponseDto } from './dtos/professional-council-resgistration-reponse.dto';
import { ProfessionalCouncilRegistrationRequestDto } from './dtos/professional-council-resgistration-request.dto';
import { FeatureUserService } from './feature-user.service';
import { UpdateUserDto } from 'src/modules/data-interaction/database/dtos/user/update-user.dto';

@Controller('user')
@ApiTags('User/Usuário')
export class FeatureUserController {
    constructor(private featureUserService: FeatureUserService) {}

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
        return await this.featureUserService.findById(Number(userId));
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
        type: UserResponseDto,
        description: 'Usuário criado.',
    })
    @SerializeOptions({
        type: UserResponseDto,
    })
    async create(@Body() body: CreateUserDto) {
        return await this.featureUserService.create(body);
    }

    @Post('password/update/request')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria um código de 6 dígitos e manda por email para o ususário que iniciou a requisição.',
        summary: 'Inicia a requisição de alteração de senha.',
    })
    @ApiOkResponseDtoData({
        type: null,
    })
    async updatePasswordRequest(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureUserService.updatePasswordRequest(Number(userId));
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
    async update(@Req() req: Request, @Body() body: CreateUserDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureUserService.update(Number(userId), body);
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
}
