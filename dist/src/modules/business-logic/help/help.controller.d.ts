import { Request } from 'express';
import { ResponseDto } from 'src/core/dtos/response.dto';
import { HelpService } from './help.service';
import { HelpRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/help/register-help.dto';
export declare class HelpController {
    private helpService;
    private readonly _logger;
    constructor(helpService: HelpService);
    register(req: Request, dto: HelpRegisterRequestDto): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity>>;
    GetById(id: string): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity>>;
    list(): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity[]>>;
    listByUser(id: string): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity[]>>;
    delete(id: string): Promise<void>;
}
