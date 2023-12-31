import { Body, Controller, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { GovbrTokenPayloadDto } from './dtos/govbr-token-payload.dto';
import { SigninRequestDto } from './dtos/signin-request.dto';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { FeatureAuthService } from './feature-auth.service';

@Controller('auth')
@ApiTags('Authentication/Autenticação')
export class FeatureAuthController {
    constructor(private featureAuthService: FeatureAuthService) {}

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
    @ApiOkResponseDtoData({
        type: SigninResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Usuário não cadastrado.',
    })
    @SerializeOptions({
        type: SigninResponseDto,
    })
    async signin(@Body() body: SigninRequestDto) {
        return await this.featureAuthService.signin(body);
    }

    // Este endpoint recebe os tokens do govbr e finaliza a chama do login único govbr.
    @Post('govbr/callback')
    @ApiExcludeEndpoint()
    async govbrTokens(@Body() body: GovbrTokenPayloadDto) {
        await this.featureAuthService.processGovbrJwt(body);
    }
}
