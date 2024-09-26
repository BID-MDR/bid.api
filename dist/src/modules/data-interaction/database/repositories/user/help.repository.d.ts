import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entitites/user.entity';
import { HelpEntity } from '../../entitites/help.entity';
import { HelpRegisterRequestDto } from '../../dtos/help/register-help.dto';
export declare class HelpRepository extends BaseRepository<HelpEntity, HelpRegisterRequestDto, HelpRegisterRequestDto> {
    private repository;
    constructor(repository: Repository<HelpEntity>);
    getById(_id: string): Promise<HelpEntity>;
    listAllMsgByUser(user: UserEntity): Promise<HelpEntity[]>;
    list(): Promise<HelpEntity[]>;
    findMonth(month: number): Promise<HelpEntity[]>;
}
