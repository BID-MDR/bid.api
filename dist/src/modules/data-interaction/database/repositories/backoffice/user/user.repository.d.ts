import { BaseRepository } from "src/core/repositories/base.repository";
import { Repository } from "typeorm";
import { UserBackofficeEntity } from "../../../entitites/user-backoffice.entity";
export declare class UserBackofficeRepository extends BaseRepository<UserBackofficeEntity, any, any> {
    private repository;
    constructor(repository: Repository<UserBackofficeEntity>);
    getById(_id: string): Promise<UserBackofficeEntity>;
    getForGuard(_id: string): Promise<UserBackofficeEntity>;
    getByEmail(email: string): Promise<UserBackofficeEntity>;
    updateLastAccess(userId: string, date: Date): Promise<import("typeorm").UpdateResult>;
    registerPassword(userId: any, password: any): Promise<UserBackofficeEntity>;
}
