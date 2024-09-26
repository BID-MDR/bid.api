import { BaseService } from 'src/core/services/base.service';
import { Server } from 'socket.io';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { HelpEntity } from 'src/modules/data-interaction/database/entitites/help.entity';
import { HelpRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/help/register-help.dto';
import { HelpRepository } from 'src/modules/data-interaction/database/repositories/user/help.repository';
export declare class HelpBackofficeService extends BaseService<HelpEntity, HelpRegisterRequestDto, HelpRegisterRequestDto> {
    private helpRepository;
    private readonly userRepository;
    server: Server;
    constructor(helpRepository: HelpRepository, userRepository: UserRepository);
    getByMonth(month: number): Promise<HelpEntity[]>;
    register(clientId: string, data: HelpRegisterRequestDto): Promise<HelpEntity>;
    delete(helpId: string): Promise<void>;
    getById(helpId: string): Promise<HelpEntity>;
    listByUser(userId: string): Promise<HelpEntity[]>;
    list(): Promise<HelpEntity[]>;
}
