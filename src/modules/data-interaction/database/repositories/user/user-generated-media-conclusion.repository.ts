import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserGeneratedMediaDto } from '../../dtos/user/user-generated-media/create-user-generated-media.dto';
import { UserGeneratedMediaConclusionEntity } from '../../entitites/user-generated-media-conclusion.entity';

@Injectable()
export class UserGeneratedMediaConclusionRepository extends BaseRepository<
    UserGeneratedMediaConclusionEntity,
    CreateUserGeneratedMediaDto,
    any
> {
    constructor(@InjectRepository(UserGeneratedMediaConclusionEntity) private repository: Repository<UserGeneratedMediaConclusionEntity>) {
        super(repository);
    }
}


