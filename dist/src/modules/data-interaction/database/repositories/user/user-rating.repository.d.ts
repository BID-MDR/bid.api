import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserRatingDto } from '../../dtos/user/user-rating/create-user-rating.dto';
import { UserRatingEntity } from '../../entitites/user-rating.entity';
export declare class UserRatingRepository extends BaseRepository<UserRatingEntity, CreateUserRatingDto, any> {
    private repository;
    constructor(repository: Repository<UserRatingEntity>);
}
