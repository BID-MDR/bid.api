import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserGeneratedMediaDto } from '../../dtos/user/user-generated-media/create-user-generated-media.dto';
import { UserGeneratedMediaEntity } from '../../entitites/user-generated-media.entity';
export declare class UserGeneratedMediaRepository extends BaseRepository<UserGeneratedMediaEntity, CreateUserGeneratedMediaDto, any> {
    private repository;
    constructor(repository: Repository<UserGeneratedMediaEntity>);
}
