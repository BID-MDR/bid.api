import { Body, Controller, Get, Param, Post, Req, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiBodyEncripted } from 'src/core/decorators/swagger/api-body-encripted.decorator';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { JwtAccessTokenGuard } from 'src/core/guards/jwt-access-token.guard';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { UserResponseDto } from 'src/modules/data-interaction/database/dtos/user/reponse-user.dto';
import { CaubRegistrationResponseDto } from './dtos/caub-resgistration-reponse.dto';
import { CaubRegistrationRequestDto } from './dtos/caub-resgistration-request.dto';
import { FeatureUserService } from './feature-user.service';

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
        type: CaubRegistrationResponseDto,
        description:
            'Retorna o status do registro do profissional no CAUBR e se existe um registro para o CPF informado.',
    })
    @SerializeOptions({
        type: CaubRegistrationResponseDto,
    })
    async checkProfessionalUserCaubRegistration(@Param() reqParams: CaubRegistrationRequestDto) {
        return await this.featureUserService.checkProfessionalUserCaubRegistration(reqParams.cpf);
    }
}
