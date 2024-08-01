import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    SerializeOptions,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { JwtAccessTokenGuard } from 'src/core/guards/jwt-access-token.guard';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { CreateRoomDto } from 'src/modules/data-interaction/database/dtos/room/create-room.dto';
import { RoomResponseDto } from 'src/modules/data-interaction/database/dtos/room/reponse-room.dto';
import { FeatureRoomService } from './feature-room.service';
import { CreateRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/create-room-solution.dto';
import { RequestRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/request.dto';

@Controller('room')
@ApiTags('Quarto')
export class FeatureRoomController {
    constructor(
        private featureRoomService: FeatureRoomService
    ) {}
    // @Get('')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    // @ApiOperation({
    //     description: 'Lista as construções do usuário logado que iniciou a requisição através do JWT no header.',
    //     summary: 'Lista as construções do usuário logado que iniciou a requisição.',
    // })
    // @ApiOkResponseDtoData({
    //     type: RoomResponseDto,
    //     description: 'Pedido de Construção.',
    // })
    // @SerializeOptions({
    //     type: RoomResponseDto,
    // })
    // async listLogged(@Req() req: Request) {
    //     const userId = (req.user as JwtPayloadInterface).userId;
    //     return await this.featureRoomService.listByUserId(userId);
    // }

    @Get('')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async list() {
        return await this.featureRoomService.selectAll();
    }

    @Get(':id')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async listByWorkRequest(@Param('id') id: string) {
        return await this.featureRoomService.selectAllWithIntervention(id);
    }

    @Get('listbyworkrequest/:id')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async listByWorkRequestId(@Param('id') id: string) {
        return await this.featureRoomService.selectAllByWorkRequest(id);
    }


    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna o Quarto.',
        summary: 'Retorna o Quarto por ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do Quarto.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: RoomResponseDto,
        description: 'Quarto.',
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
        description: 'Cria um Quarto.',
        summary: 'Cria um Quarto.',
    })
    @ApiBody({
        type: CreateRoomDto,
        required: true,
        description: 'Quarto a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: RoomResponseDto,
        description: 'Quarto a ser criado.',
    })
    @SerializeOptions({
        type: RoomResponseDto,
    })
    async create(@Body() body: CreateRoomDto) {
        return await this.featureRoomService.create(body);
    }

    @Post('room-solution')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria um Quarto.',
        summary: 'Cria um Quarto.',
    })
    @ApiBody({
        type: CreateRoomSolutionDto,
        required: true,
        description: 'Quarto a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: RoomResponseDto,
        description: 'Quarto a ser criado.',
    })
    @SerializeOptions({
        type: RoomResponseDto,
    })
    async createRoomSolution(@Body() body: CreateRoomSolutionDto) {
        return await this.featureRoomService.createRoomSolution(body);
    }

    @Post('room-solution/wait-intervention')
    @UseInterceptors(new EncryptInterceptor())
    async waitIntervention(@Body() body: RequestRoomSolutionDto){

       return await this.featureRoomService.register(body)
    }
}
