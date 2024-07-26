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
import { MessageService } from './message.service';
import { MessageRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/message/register-message.dto';

@Controller('message')
@ApiTags('Message/mensagens')
export class MessageController {
    private readonly _logger = new Logger(MessageController.name);

    constructor(private messageService: MessageService) {}

    @Get('reciver/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getLogged(@Req() req: Request , @Param('id') id:string ) {
        const userId = (req.user as JwtPayloadInterface).userId
         const messageList =  await this.messageService.listConversation(userId, id);
        return new ResponseDto(true, messageList, false)
    }

    @Post('reciver/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async register(@Req() req: Request, @Param('id') id:string , @Body() dto: MessageRegisterRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.messageService.register(userId, id, dto);
    }

    @Delete('delete-by-id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async delete(@Param('id') id: string, @Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.messageService.delete(id, userId);
    }


}
