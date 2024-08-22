import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
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
import { HelpService } from './help.service';
import { HelpRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/help/register-help.dto';

@Controller('help')
@ApiTags('Help/help')
export class HelpController {
    private readonly _logger = new Logger(HelpController.name);

    constructor(private helpService: HelpService) {}

    @Post('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async register(@Req() req: Request, @Body() dto: HelpRegisterRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const help =  await this.helpService.register(userId, dto);
        return new ResponseDto(true, help, false)
    }

    @Get('get-by-id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async GetById(@Param('id') id:string) {
        const help = await this.helpService.getById(id);
        return new ResponseDto(true, help, false)
    }

    @Get('')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async list() {
        const help = await this.helpService.list();
        return new ResponseDto(true, help, false)
    }

    @Get('user/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async listByUser(@Param('id') id: string) {
        const help = await this.helpService.listByUser(id);
        return new ResponseDto(true, help, false)
    }

    @Delete('delete-by-id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async delete(@Param('id') id: string) {
        return await this.helpService.delete(id);
    }

}
