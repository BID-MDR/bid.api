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
import { CreateContractDto } from 'src/modules/data-interaction/database/dtos/contract/create-contract.dto';
import { ContractResponseDto } from 'src/modules/data-interaction/database/dtos/contract/reponse-contract.dto';
import { UpdateContractDto } from 'src/modules/data-interaction/database/dtos/contract/update-contract.dto';
import { FeatureContractService } from './feature-contract.service';

@Controller('contract')
@ApiTags('Contrato')
export class FeatureContractModule {
    constructor(private featureContractService: FeatureContractService) {}
    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Lista os contratos do usuário logado que iniciou a requisição através do JWT no header.',
        summary: 'Lista os contratos de custo do usuário logado que iniciou a requisição.',
    })
    @ApiOkResponseDtoData({
        type: ContractResponseDto,
        description: 'Pedido de Contrato.',
    })
    @SerializeOptions({
        type: ContractResponseDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureContractService.listByUserId(userId);
    }

    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna o contrato.',
        summary: 'Retorna o contrato ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do contrato.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: ContractResponseDto,
        description: 'Contrato.',
    })
    @SerializeOptions({
        type: ContractResponseDto,
    })
    async getById(@Param('id') id: string) {
        return await this.featureContractService.findById(id);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria um contrato.',
        summary: 'Cria um contrato.',
    })
    @ApiBody({
        type: CreateContractDto,
        required: true,
        description: 'Contrato a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: ContractResponseDto,
        description: 'Contrato a ser criado.',
    })
    @SerializeOptions({
        type: ContractResponseDto,
    })
    async create(@Body() body: CreateContractDto) {
        return await this.featureContractService.create(body);
    }
}
