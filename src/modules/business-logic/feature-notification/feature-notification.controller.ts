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
import { CreateNotificationDto } from 'src/modules/data-interaction/database/dtos/notification/create-notification.dto';
import { NotificationResponseDto } from 'src/modules/data-interaction/database/dtos/notification/response-notification.dto';
import { UpdateNotificationDto } from 'src/modules/data-interaction/database/dtos/notification/update-notification.dto';
import { FeatureNotificationService } from './feature-notification.service';

@Controller('notifications')
@ApiTags('Notificação')
export class FeatureNotificationController {
    constructor(private featureNotificationService: FeatureNotificationService) {}

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Lista as visitas técnicas do usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Lista as visitas técnicas do usuário logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: NotificationResponseDto,
        description: 'Pedido de obra.',
    })
    @SerializeOptions({
        type: NotificationResponseDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureNotificationService.listByUserId(userId);
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
        type: NotificationResponseDto,
        description: 'Visita técnica.',
    })
    @SerializeOptions({
        type: NotificationResponseDto,
    })
    async getById(@Param('id') id: string) {
        return await this.featureNotificationService.findById(id);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria uma visita técnica.',
        summary: 'Cria uma visita técnica.',
    })
    @ApiBody({
        type: CreateNotificationDto,
        required: true,
        description: 'Visita técnica a ser criada.',
    })
    @ApiOkResponseDtoData({
        type: NotificationResponseDto,
        description: 'Visita técnica criada.',
    })
    @SerializeOptions({
        type: NotificationResponseDto,
    })
    async create(@Body() body: CreateNotificationDto) {
        return await this.featureNotificationService.create(body);
    }

    @Put('')
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Enpoint único para Atualizar uma visita técnica.',
        summary: 'Atualiza uma visita técnica.',
    })
    @ApiBody({
        type: UpdateNotificationDto,
        required: true,
        description: 'Visita técnica a ser atualizada.',
    })
    @ApiOkResponseDtoData({
        type: NotificationResponseDto,
        description: 'Visita técnica atualizada.',
    })
    @SerializeOptions({
        type: NotificationResponseDto,
    })
    async update(@Req() req: Request, @Body() body: UpdateNotificationDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureNotificationService.update(userId, body);
    }
}
