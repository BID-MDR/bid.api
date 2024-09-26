import { Request } from 'express';
import { ResponseDto } from 'src/core/dtos/response.dto';
import { HelpRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/help/register-help.dto';
import { HelpBackofficeService } from './help.service';
export declare class HelpBackofficeController {
    private helpService;
    private readonly _logger;
    constructor(helpService: HelpBackofficeService);
    register(req: Request, dto: HelpRegisterRequestDto): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity>>;
    GetById(id: string): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity>>;
    list(): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity[]>>;
    listWithMonth(month: number): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity[]>>;
    listByUser(id: string): Promise<ResponseDto<import("../../data-interaction/database/entitites/help.entity").HelpEntity[]>>;
    delete(id: string): Promise<void>;
}
