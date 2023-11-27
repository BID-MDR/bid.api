import { Controller, Post, UseGuards, Body, Get, SerializeOptions } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { JwtAccessTokenGuard } from 'src/core/guards/jwt-access-token.guard';
import { FeatureUserService } from './feature-user.service';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { ResponseUserDto } from 'src/modules/data-interaction/database/dtos/user/reponse-user.dto';

@Controller('user')
@ApiTags('User/Usuário')
export class FeatureUserController {
    constructor(private featureUserService: FeatureUserService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Cria um usuário.',
        summary: 'Cria um usuário.',
    })
    @ApiBody({
        type: CreateUserDto,
    })
    @ApiOkResponseDtoData({
        type: ResponseUserDto,
        description: 'Retorna o usuário criado.',
    })
    @SerializeOptions({
        type: ResponseUserDto,
    })
    async createUser(@Body() dto: CreateUserDto) {
        return await this.featureUserService.create(dto);
    }
}
