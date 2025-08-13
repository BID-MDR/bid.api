import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserGeneratedMediaDto } from '../../dtos/user/user-generated-media/create-user-generated-media.dto';
import { UserGeneratedMediaEntity } from '../../entitites/user-generated-media.entity';

@Injectable()
export class UserGeneratedMediaRepository extends BaseRepository<
    UserGeneratedMediaEntity,
    CreateUserGeneratedMediaDto,
    any
> {
    constructor(@InjectRepository(UserGeneratedMediaEntity) private repository: Repository<UserGeneratedMediaEntity>) {
        super(repository);
    }
}


