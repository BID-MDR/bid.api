import { Body, Controller, Get, Param, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { GovbrCodeChallengeResponseDto } from './dtos/govbr-code-challenge-response.dto';
import { SigninRequestDto } from './dtos/signin-request.dto';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { FeatureAuthService } from './feature-auth.service';
import { GetSsoRequestDto } from './dtos/get-sso-request.dto';

@Controller('auth')
@ApiTags('Authentication/Autenticação')
export class FeatureAuthController {
    constructor(private featureAuthService: FeatureAuthService) {}

    @Get('sso/id/:id')
    @ApiOperation({
        description: 'Pelo id retorna um jwt e demais informações.',
        summary: 'Retorna os dados de uma tentativa de sso.',
    })
    @ApiParam({
        name: 'id',
        type: String,
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: SigninResponseDto,
    })
    @SerializeOptions({
        type: SigninResponseDto,
    })
    async getSsoId(@Param() dto: GetSsoRequestDto) {
        return await this.featureAuthService.getSsoId(dto.id);
    }

    @Post('signin')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description:
            'Autentica um usuário através do login único govbr e retorna um JWT ou um erro de usuário não cadastrado. Use após redirecionar o usuário para a página de login único govbr.',
        summary: 'Autentica um usuário.',
    })
    @ApiBody({
        type: SigninRequestDto,
        required: true,
    })
    @ApiNotFoundResponse({
        description: 'Usuário não cadastrado.',
    })
    @ApiOkResponseDtoData({
        type: String,
    })
    @SerializeOptions({
        type: String,
    })
    async signin(@Body() body: SigninRequestDto) {
        return await this.featureAuthService.govbrAuthorize(body);
    }

    @Post('govbr/sso')
    @ApiOperation({
        summary: 'Gera um code_challenge para o login único govbr.',
    })
    @ApiOkResponseDtoData({
        type: GovbrCodeChallengeResponseDto,
    })
    @SerializeOptions({
        type: GovbrCodeChallengeResponseDto,
    })
    async generateSsoGovbr() {
        return await this.featureAuthService.generateSsoGovbr();
    }
}
