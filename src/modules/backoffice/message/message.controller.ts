import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "src/core/dtos/response.dto";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { MessageService } from "src/modules/business-logic/message/message.service";
import { MessageRegisterRequestDto } from "src/modules/data-interaction/database/dtos/message/register-message.dto";
import { Request } from 'express'
import { MessageBackofficeService } from "./message.service";
import { MessageBackofficeRegisterRequestDto } from "../help/dto/message-register.dto";

@Controller('backoffice-message')
@ApiTags('Message/mensagens')
export class MessageBackofficeController {
    private readonly _logger = new Logger(MessageBackofficeController.name);

    constructor(private messageService: MessageBackofficeService) {}

    @Get('reciver/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getLogged(@Req() req: Request , @Param('id') id:string) {
        const userId = (req.user as JwtPayloadInterface).userId
         const messageList =  await this.messageService.listConversation(userId, id);
        return new ResponseDto(true, messageList, false)
    }

    @Post('reciver/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async register(@Req() req: Request, @Param('id') id:string,  @Body() dto: MessageBackofficeRegisterRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.messageService.register(userId, id, dto);
    }

    @Get('all-user-conversation/:id')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async listConversation(@Req() req: Request, @Param('id') id:string) {
       // const userId = (req.user as JwtPayloadInterface).userId;
       console.log(id)
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
