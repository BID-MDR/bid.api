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
import { CreateCostEstimationDto } from 'src/modules/data-interaction/database/dtos/cost-estimation/create-cost-estimation.dto';
import { CostEstimationResponseDto } from 'src/modules/data-interaction/database/dtos/cost-estimation/reponse-cost-estimation.dto';
import { UpdateCostEstimationDto } from 'src/modules/data-interaction/database/dtos/cost-estimation/update-cost-estimation.dto';
import { FeatureCostEstimationService } from './feature-cost-estimation.service';

@Controller('cost-estimation')
@ApiTags('Cost Estimation/Estimativa de custo')
export class FeatureCostEstimationModule {
    constructor(private featureCostEstimationService: FeatureCostEstimationService) {}

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Lista as estimativa de custo do usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Lista as estimativa de custo do usuário logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: CostEstimationResponseDto,
        description: 'Pedido de custo.',
    })
    @SerializeOptions({
        type: CostEstimationResponseDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureCostEstimationService.listByUserId(userId);
    }

    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna a estimativa de custo.',
        summary: 'Retorna a estimativa de custo ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID da estimativa de custo.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: CostEstimationResponseDto,
        description: 'Estimativa Custo.',
    })
    @SerializeOptions({
        type: CostEstimationResponseDto,
    })
    async getById(@Param('id') id: string) {
        return await this.featureCostEstimationService.findById(id);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria uma estimativa de custo.',
        summary: 'Cria uma estimativa de custo.',
    })
    @ApiBody({
        type: CreateCostEstimationDto,
        required: true,
        description: 'Estimativa de custo a ser criada.',
    })
    @ApiOkResponseDtoData({
        type: CostEstimationResponseDto,
        description: 'Estimativa de custo criada.',
    })
    @SerializeOptions({
        type: CostEstimationResponseDto,
    })
    async create(@Body() body: CreateCostEstimationDto) {
        return await this.featureCostEstimationService.create(body);
    }
}
