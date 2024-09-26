import { ResponseDto } from "src/core/dtos/response.dto";
import { Request } from 'express';
import { MessageBackofficeService } from "./message.service";
import { MessageBackofficeRegisterRequestDto } from "../help/dto/message-register.dto";
export declare class MessageBackofficeController {
    private messageService;
    private readonly _logger;
    constructor(messageService: MessageBackofficeService);
    getLogged(req: Request, id: string): Promise<ResponseDto<import("../../data-interaction/database/entitites/message-backoffice.entity").MessageBackofficeEntity[]>>;
    register(req: Request, id: string, dto: MessageBackofficeRegisterRequestDto): Promise<import("../../data-interaction/database/entitites/message-backoffice.entity").MessageBackofficeEntity>;
    listConversation(req: Request, id: string): Promise<ResponseDto<import("../help/interfaces/userWithLastMessage.interface").UserWithLastMessageBackoffice[]>>;
    delete(id: string, req: Request): Promise<void>;
}
