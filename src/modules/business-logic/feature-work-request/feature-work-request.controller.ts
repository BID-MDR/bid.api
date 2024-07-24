import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
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
import { ResponseDto } from 'src/core/dtos/response.dto';

@Controller('work-request')
@ApiTags('Work Request/Pedido de Obra')
export class FeatureWorkRequestController {
    private readonly _logger = new Logger(FeatureWorkRequestController.name);

    constructor(private featureWorkRequestService: FeatureWorkRequestService) { }

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

    @Get('profissional/find')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getAll() {
        try {
            const result = await this.featureWorkRequestService.findAllNotAtribute();
            return new ResponseDto(true, result, null);
        } catch (error) {
            this._logger.error(error.message);

            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('beneficiary-id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getByBeneficiaryId(
        @Param('id') id: string
    ) {
        try {
            const result = await this.featureWorkRequestService.getByBeneficiaryId(id);
            return new ResponseDto(true, result, null);
        } catch (error) {
            this._logger.error(error.message);

            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }


    @Put(':work_id/:professional_id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async updateStatus(@Param('work_id') work_id: string, @Param('professional_id') professional_id: string) {
        return await this.featureWorkRequestService.updateStatus(work_id, professional_id);
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
        try {
            const result = await this.featureWorkRequestService.findById(userId);
            return new ResponseDto(true, result, null);
        } catch (error) {
            this._logger.error(error.message);

            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
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
    async create(@Req() req: Request, @Body() body: CreateWorkRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureWorkRequestService.register(userId, body);
    }

    @Post('regmel')
    @UseInterceptors(new EncryptInterceptor())
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Cria um pedido de obra regmel.',
        summary: 'Cria um pedido de obra regmel.',
    })
    @ApiBody({
        type: CreateWorkRequestDto,
        required: true,
        description: 'Pedido de obra regmel a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: WorkRequestResponseDto,
        description: 'Pedido de obra regmel criado.',
    })
    @SerializeOptions({
        type: WorkRequestResponseDto,
    })
    async createRegmel(@Req() req: Request, @Body() body: CreateWorkRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureWorkRequestService.registerRequestRegmel(userId, body);
    }

    @Get('beneficiario-regmel')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna a lista de pedido de obra para beneficiário regmel.',
        summary: 'Retorna a lista de pedido de obra.',
    })
    @ApiOkResponseDtoData({
        type: WorkRequestResponseDto,
        description: 'Lista de pedido de obra.',
    })
    @SerializeOptions({
        type: WorkRequestResponseDto,
    })
    async getBeneficiaryRegmel(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureWorkRequestService.getByBeneficiaryId(userId);
    }

    @Get('profissional-regmel')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna a lista de pedido de obra para profissional regmel.',
        summary: 'Retorna a lista de pedido de obra.',
    })
    @ApiOkResponseDtoData({
        type: WorkRequestResponseDto,
        description: 'Lista de pedido de obra.',
    })
    @SerializeOptions({
        type: WorkRequestResponseDto,
    })
    async getProfessionalRegmel(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureWorkRequestService.getByProfessionalId(userId
        );
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
