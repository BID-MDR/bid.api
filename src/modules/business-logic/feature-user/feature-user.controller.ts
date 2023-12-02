import { Controller, Get, Param, SerializeOptions } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { CaubRegistrationResponseDto } from './dtos/caub-resgistration-reponse.dto';
import { FeatureUserService } from './feature-user.service';
import { CaubRegistrationRequestDto } from './dtos/caub-resgistration-request.dto';

@Controller('user')
@ApiTags('User/Usuário')
export class FeatureUserController {
    constructor(private featureUserService: FeatureUserService) {}

    @Get('caub/check-professional-status/cpf/:cpf')
    @ApiParam({
        name: 'cpf',
        description: 'CPF do usuário.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOperation({
        description: 'Necessário para cadastrar o usuário profissional arquiteto/urbanista na plataforma.',
        summary: 'Retorna o status do registro do profissional no CAUB pelo CPF.',
    })
    @ApiOkResponseDtoData({
        type: CaubRegistrationResponseDto,
        description: 'Retorna o status do registro do profissional no CAUB.',
    })
    @SerializeOptions({
        type: CaubRegistrationResponseDto,
    })
    async checkProfessionalUserCaubRegistration(@Param() reqParams: CaubRegistrationRequestDto) {
        return await this.featureUserService.checkProfessionalUserCaubRegistration(reqParams.cpf);
    }
}
