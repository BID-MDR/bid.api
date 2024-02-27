import { Body, Controller, Post, Res, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { GovbrTokenPayloadDto } from './dtos/govbr-token-payload.dto';
import { SigninRequestDto } from './dtos/signin-request.dto';
import { SigninResponseDto } from './dtos/signin-response.dto';
import { FeatureAuthService } from './feature-auth.service';
import { DevOnlyRoute } from 'src/core/decorators/nestjs/dev-only.decorator';
import { GovbrCodeChallengeResponseDto } from './dtos/govbr-code-challenge-response.dto';
import { Response } from 'express';

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
    async signin(@Body() body: SigninRequestDto, @Res() res: Response) {
        const tokenId = await this.featureAuthService.signin(body);
        res.redirect(`http://localhost:4200?token=${tokenId}`);
    }

    @DevOnlyRoute()
    @Post('signin/beneficiary')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        summary: 'Retorna o login de um beneficiário da base. O primeiro.',
    })
    @ApiOkResponseDtoData({
        type: SigninResponseDto,
    })
    @SerializeOptions({
        type: SigninResponseDto,
    })
    async signinDevBeneficiary() {
        return await this.featureAuthService.signinDevBeneficiary();
    }

    @DevOnlyRoute()
    @Post('signin/professional')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        summary: 'Retorna o login de um profissional da base. O primeiro.',
    })
    @ApiOkResponseDtoData({
        type: SigninResponseDto,
    })
    @SerializeOptions({
        type: SigninResponseDto,
    })
    async signinDevProfessional() {
        return await this.featureAuthService.signinDevProfessional();
    }

    // Este endpoint recebe os tokens do govbr e dá andamento a chamada do login único govbr (signin deste controller).
    @Post('govbr/callback')
    @ApiExcludeEndpoint()
    async govbrTokens(@Body() body: GovbrTokenPayloadDto) {
        await this.featureAuthService.processGovbrJwt(body);
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
