import { Body, Controller, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DevOnlyRoute } from 'src/core/decorators/nestjs/dev-only.decorator';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { GovbrCodeChallengeResponseDto } from './dtos/govbr-code-challenge-response.dto';
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
