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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { JwtAccessTokenGuard } from 'src/core/guards/jwt-access-token.guard';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import { CreateConstructionDto } from 'src/modules/data-interaction/database/dtos/construction/create-construction.dto';
import { ConstructionResponseDto } from 'src/modules/data-interaction/database/dtos/construction/reponse-construction.dto';
import { UpdateConstructionDto } from 'src/modules/data-interaction/database/dtos/construction/update-construction.dto';
import { FeatureConstructionService } from './feature-construction.service';

@Controller('construction')
@ApiTags('Construção')
export class FeatureConstructionController {
    constructor(private featureConstructionService: FeatureConstructionService) {}
    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Lista as construções do usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Lista as construções do usuário logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: ConstructionResponseDto,
        description: 'Pedido de Construção.',
    })
    @SerializeOptions({
        type: ConstructionResponseDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureConstructionService.listByUserId(userId);
    }

    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna o Construção.',
        summary: 'Retorna o Construção ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do Construção.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: ConstructionResponseDto,
        description: 'Construção.',
    })
    @SerializeOptions({
        type: ConstructionResponseDto,
    })
    async getById(@Param('id') id: string) {
        return await this.featureConstructionService.findById(id);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria um Construção.',
        summary: 'Cria um Construção.',
    })
    @ApiBody({
        type: CreateConstructionDto,
        required: true,
        description: 'Construção a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: ConstructionResponseDto,
        description: 'Construção a ser criado.',
    })
    @SerializeOptions({
        type: ConstructionResponseDto,
    })
    async create(@Body() body: CreateConstructionDto) {
        return await this.featureConstructionService.create(body);
    }
}
