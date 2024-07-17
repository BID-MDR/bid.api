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
import { CreateWorkRequestDto } from 'src/modules/data-interaction/database/dtos/work-request/create-work-request.dto';
import { WorkRequestResponseDto } from 'src/modules/data-interaction/database/dtos/work-request/response-work-request.dto';
import { UpdateWorkRequestDto } from 'src/modules/data-interaction/database/dtos/work-request/update-work-request.dto';
import { FeatureWorkRequestService } from './feature-work-request.service';

@Controller('work-request')
@ApiTags('Work Request/Pedido de Obra')
export class FeatureWorkRequestController {
    constructor(private featureWorkRequestService: FeatureWorkRequestService) {}

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description:
            'Retorna o pedido de obra do pedido de obra logado que iniciou a requisição através do JWT no header.',
        summary: 'Retorna o pedido de obra do pedido de obra logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: WorkRequestResponseDto,
        description: 'Pedido de obra.',
    })
    @SerializeOptions({
        type: WorkRequestResponseDto,
    })
    async getLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureWorkRequestService.findByUserId(userId);
    }

    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna o pedido de obra.',
        summary: 'Retorna o pedido de obra pelo ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do pedido de obra.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: WorkRequestResponseDto,
        description: 'Pedido de obra.',
    })
    @SerializeOptions({
        type: WorkRequestResponseDto,
    })
    async getById(@Param('id') userId: string) {
        return await this.featureWorkRequestService.findById(userId);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Cria um pedido de obra.',
        summary: 'Cria um pedido de obra.',
    })
    @ApiBody({
        type: CreateWorkRequestDto,
        required: true,
        description: 'Pedido de obra a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: WorkRequestResponseDto,
        description: 'Pedido de obra criado.',
    })
    @SerializeOptions({
        type: WorkRequestResponseDto,
    })
    async create(@Req() req: Request,@Body() body: CreateWorkRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureWorkRequestService.register(userId, body);
    }

    @Put('')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Enpoint único para Atualizar um pedido de obra.',
        summary: 'Atualiza um pedido de obra.',
    })
    @ApiBody({
        type: UpdateWorkRequestDto,
        required: true,
        description: 'Pedido de obra a ser atualizado.',
    })
    @ApiOkResponseDtoData({
        type: WorkRequestResponseDto,
        description: 'Pedido de obra atualizado.',
    })
    @SerializeOptions({
        type: WorkRequestResponseDto,
    })
    async update(@Req() req: Request, @Body() body: UpdateWorkRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureWorkRequestService.update(userId, body);
    }
}
