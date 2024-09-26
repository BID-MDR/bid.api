import { Request } from 'express';
import { ResponseDto } from 'src/core/dtos/response.dto';
import { MessageService } from './message.service';
import { MessageRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/message/register-message.dto';
export declare class MessageController {
    private messageService;
    private readonly _logger;
    constructor(messageService: MessageService);
    getLogged(req: Request, id: string): Promise<ResponseDto<import("../../data-interaction/database/entitites/message.entity").MessageEntity[]>>;
    register(req: Request, id: string, dto: MessageRegisterRequestDto): Promise<import("../../data-interaction/database/entitites/message.entity").MessageEntity>;
    listConversation(req: Request, id: string): Promise<ResponseDto<import("../../../core/interfaces/userWithLastMessage.interface").UserWithLastMessage[]>>;
    delete(id: string, req: Request): Promise<void>;
}
