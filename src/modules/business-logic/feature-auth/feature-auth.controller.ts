import { Body, Controller, Get, Param, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { GovbrCodeChallengeResponseDto } from './dtos/govbr-code-challenge-response.dto';
import { SigninRequestDto } from './dtos/signin-request.dto';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { FeatureAuthService } from './feature-auth.service';
import { GetSsoRequestDto } from './dtos/get-sso-request.dto';
import { ResponseDto } from 'src/core/dtos/response.dto';

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
        console.log('teste1', dto);
        const result =  await this.featureAuthService.getSsoId(dto.id);
        return new ResponseDto(true, result, null);

    }

    @Post('signin')
    @ApiOperation({
        description:
            'Autentica um usuário através do login único govbr e retorna um JWT ou um erro de usuário não cadastrado. Use após redirecionar o usuário para a página de login único govbr.',
        summary: 'Autentica um usuário.',
    })
    @ApiBody({
        type: SigninRequestDto
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
        console.log('body login', body);
        const result =  await this.featureAuthService.govbrAuthorize(body);

        return new ResponseDto(true, result, null);
        
    }

    @Get('govbr/sso')
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
        console.log('teste 2');
        const result = await this.featureAuthService.generateSsoGovbr();
        console.log('result teste 2 ', result);
        return new ResponseDto(true, result, null);
    }
}
