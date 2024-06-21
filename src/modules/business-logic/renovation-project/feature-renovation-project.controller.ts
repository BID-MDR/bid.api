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
import { CreateRenovationProjectDto } from 'src/modules/data-interaction/database/dtos/renovation-project/create-renovation-project.dto';
import { RenovationProjectResponseDto } from 'src/modules/data-interaction/database/dtos/renovation-project/reponse-renovation-project.dto';
import { UpdateRenovationProjectDto } from 'src/modules/data-interaction/database/dtos/renovation-project/update-renovation-project.dto';
import { FeatureRenovationProjectService } from './feature-renovation-project.service';

@Controller('renovation-project')
@ApiTags('Projeto de Renovação')
export class FeatureRenovationProjectModule {
    constructor(private featureRenovationProjectService: FeatureRenovationProjectService) {}

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Lista as renovação projeto do usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Lista as renovação projeto do usuário logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: RenovationProjectResponseDto,
        description: 'Pedido de custo.',
    })
    @SerializeOptions({
        type: RenovationProjectResponseDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureRenovationProjectService.listByUserId(userId);
    }

    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna a renovação projeto.',
        summary: 'Retorna a renovação projeto ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID da renovação projeto.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: RenovationProjectResponseDto,
        description: 'Renovação Projeto.',
    })
    @SerializeOptions({
        type: RenovationProjectResponseDto,
    })
    async getById(@Param('id') id: string) {
        return await this.featureRenovationProjectService.findById(id);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria uma renovação projeto.',
        summary: 'Cria uma renovação projeto.',
    })
    @ApiBody({
        type: CreateRenovationProjectDto,
        required: true,
        description: 'renovação projeto a ser criada.',
    })
    @ApiOkResponseDtoData({
        type: RenovationProjectResponseDto,
        description: 'renovação projeto criada.',
    })
    @SerializeOptions({
        type: RenovationProjectResponseDto,
    })
    async create(@Body() body: CreateRenovationProjectDto) {
        return await this.featureRenovationProjectService.create(body);
    }
}
