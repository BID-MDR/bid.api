import { BaseRepository } from "src/core/repositories/base.repository";
import { Repository } from "typeorm";
import { UserRolesBackofficeEntity } from "../../../entitites/user-roles-backoffice.entity";
import { FunctionTypeEnum } from "src/modules/backoffice/user/dto/functionTypeEnum";
export declare class UserRolesBackofficeRepository extends BaseRepository<UserRolesBackofficeEntity, any, any> {
    private repository;
    constructor(repository: Repository<UserRolesBackofficeEntity>);
    findByName(name: FunctionTypeEnum): Promise<UserRolesBackofficeEntity>;
}
