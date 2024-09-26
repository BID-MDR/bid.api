import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { GovbrSsoEntity } from '../entitites/govbr-sso.entity';
export declare class GovbrSsoRepository extends BaseRepository<GovbrSsoEntity, any, any> {
    private repository;
    constructor(repository: Repository<GovbrSsoEntity>);
}
