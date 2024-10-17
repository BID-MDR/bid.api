import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    Req,
    SerializeOptions,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { JwtAccessTokenGuard } from 'src/core/guards/jwt-access-token.guard';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';
import { ResponseDto } from 'src/core/dtos/response.dto';
import { HelpRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/help/register-help.dto';
import { HelpBackofficeService } from './help.service';
import { RolesBackofficeGuard } from 'src/core/guards/roles-backoffice.guard';
import { Roles } from 'src/core/decorators/roles-backoffice.decorator';
import { FunctionTypeEnum } from '../user/dto/functionTypeEnum';

@Controller('help-backoffice')
@ApiTags('Help/help')
export class HelpBackofficeController {
    private readonly _logger = new Logger(HelpBackofficeController.name);

    constructor(private helpService: HelpBackofficeService) {}

    @Post('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.SOLICITACAO_AJUDA])
    async register(@Req() req: Request, @Body() dto: HelpRegisterRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const help =  await this.helpService.register(userId, dto);
        return new ResponseDto(true, help, false)
    }

    @Get('get-by-id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.SOLICITACAO_AJUDA])
    async GetById(@Param('id') id:string) {
        const help = await this.helpService.getById(id);
        return new ResponseDto(true, help, false)
    }

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.SOLICITACAO_AJUDA])
    async list() {
        const help = await this.helpService.list();
        return new ResponseDto(true, help, false)
    }

    @Get('get-month/:month')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async listWithMonth(@Param('month') month: number) {
        const help = await this.helpService.getByMonth(month);
        return new ResponseDto(true, help, false)
    }


    @Get('user/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.SOLICITACAO_AJUDA])
    async listByUser(@Param('id') id: string) {
        const help = await this.helpService.listByUser(id);
        return new ResponseDto(true, help, false)
    }

    @Put('update/:id')
    @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    // @Roles([FunctionTypeEnum.SOLICITACAO_AJUDA])
    async updateOpen(@Param('id') id: string) {
        const help = await this.helpService.updateStatusOpen(id);
        return new ResponseDto(true, help, false)
    }

    @Delete('delete-by-id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.SOLICITACAO_AJUDA])
    async delete(@Param('id') id: string) {
        return await this.helpService.delete(id);
    }

}
