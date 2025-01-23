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
import { JwtAccessTokenGuard } from 'src/core/guards/jwt-access-token.guard';
import { JwtPayloadInterface } from 'src/core/interfaces/jwt-payload.interface';

import { ResponseDto } from 'src/core/dtos/response.dto';
import { NotificationMessageService } from './notification-message.service';
import { NotificationMessageRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/notificationMsg/register-notification-message.dto';

@Controller('notification-message')
@ApiTags('Notification Message/mensagens')
export class NotificationMessageController {
    private readonly _logger = new Logger(NotificationMessageController.name);

    constructor(private messageService: NotificationMessageService) {}

    @Get('reciver')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId
         const messageList =  await this.messageService.listConversation(userId);
        return new ResponseDto(true, messageList, false)
    }

    @Post('reciver')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async register(@Req() req: Request , @Body() dto: NotificationMessageRegisterRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.messageService.register(userId,  dto);
    }

    @Get('all-user-conversation/:id')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async listConversation(@Req() req: Request, @Param('id') id:string) {
       // const userId = (req.user as JwtPayloadInterface).userId;
        const msglist = await this.messageService.listAllMsgByUser(id);
        return new ResponseDto(true, msglist, false)
    }


    @Delete('delete-by-id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async delete(@Param('id') id: string, @Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.messageService.delete(id, userId);
    }


}
