import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { GovbrSsoEntity } from '../entitites/govbr-sso.entity';

@Injectable()
export class GovbrSsoRepository extends BaseRepository<GovbrSsoEntity, any, any> {
    constructor(@InjectRepository(GovbrSsoEntity) private repository: Repository<GovbrSsoEntity>) {
        super(repository);
    }
}
