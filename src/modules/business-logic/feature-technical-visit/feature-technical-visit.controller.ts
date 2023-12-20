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
import { FeatureTechnicalVisitService } from './feature-technical-visit.service';
import { TechnicalVisitResponseDto } from 'src/modules/data-interaction/database/dtos/technical-visit/reponse-technical-visit.dto';
import { CreateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit.dto';
import { UpdateTechnicalVisitDto } from 'src/modules/data-interaction/database/dtos/technical-visit/update-technical-visit.dto';

@Controller('technical-visit')
@ApiTags('Technical Visit/Visita Técnica')
export class FeatureTechnicalVisitController {
    constructor(private featureTechnicalVisitService: FeatureTechnicalVisitService) {}

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Lista as visitas técnicas do usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Lista as visitas técnicas do usuário logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: TechnicalVisitResponseDto,
        description: 'Pedido de obra.',
    })
    @SerializeOptions({
        type: TechnicalVisitResponseDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureTechnicalVisitService.listByUserId(userId);
    }

    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna a visita técnica.',
        summary: 'Retorna a visita técnica pelo ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID da visita técnica.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: TechnicalVisitResponseDto,
        description: 'Visita técnica.',
    })
    @SerializeOptions({
        type: TechnicalVisitResponseDto,
    })
    async getById(@Param('id') id: string) {
        return await this.featureTechnicalVisitService.findById(id);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria uma visita técnica.',
        summary: 'Cria uma visita técnica.',
    })
    @ApiBodyEncripted({
        type: CreateTechnicalVisitDto,
        required: true,
        description: 'Visita técnica a ser criada.',
    })
    @ApiOkResponseDtoData({
        type: TechnicalVisitResponseDto,
        description: 'Visita técnica criada.',
    })
    @SerializeOptions({
        type: TechnicalVisitResponseDto,
    })
    async create(@Body() body: CreateTechnicalVisitDto) {
        return await this.featureTechnicalVisitService.create(body);
    }

    @Put('')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Enpoint único para Atualizar uma visita técnica.',
        summary: 'Atualiza uma visita técnica.',
    })
    @ApiBodyEncripted({
        type: UpdateTechnicalVisitDto,
        required: true,
        description: 'Visita técnica a ser atualizada.',
    })
    @ApiOkResponseDtoData({
        type: TechnicalVisitResponseDto,
        description: 'Visita técnica atualizada.',
    })
    @SerializeOptions({
        type: TechnicalVisitResponseDto,
    })
    async update(@Req() req: Request, @Body() body: UpdateTechnicalVisitDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureTechnicalVisitService.update(userId, body);
    }
}
