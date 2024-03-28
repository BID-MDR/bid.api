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
import { CreateRoomDto } from 'src/modules/data-interaction/database/dtos/room/create-room.dto';
import { RoomResponseDto } from 'src/modules/data-interaction/database/dtos/room/reponse-room.dto';
import { UpdateRoomDto } from 'src/modules/data-interaction/database/dtos/room/update-room.dto';
import { FeatureRoomService } from './feature-room.service';

@Controller('room')
@ApiTags('Quarto')
export class FeatureRoomModule {
    constructor(private featureRoomService: FeatureRoomService) {}
    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Lista as construções do usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Lista as construções do usuário logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: RoomResponseDto,
        description: 'Pedido de Construção.',
    })
    @SerializeOptions({
        type: RoomResponseDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureRoomService.listByUserId(userId);
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
        type: RoomResponseDto,
        description: 'Construção.',
    })
    @SerializeOptions({
        type: RoomResponseDto,
    })
    async getById(@Param('id') id: string) {
        return await this.featureRoomService.findById(id);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria um Construção.',
        summary: 'Cria um Construção.',
    })
    @ApiBody({
        type: CreateRoomDto,
        required: true,
        description: 'Construção a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: RoomResponseDto,
        description: 'Construção a ser criado.',
    })
    @SerializeOptions({
        type: RoomResponseDto,
    })
    async create(@Body() body: CreateRoomDto) {
        return await this.featureRoomService.create(body);
    }
}
