import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserRatingDto } from '../../dtos/user/user-rating/create-user-rating.dto';
import { UserRatingEntity } from '../../entitites/user-rating.entity';

export class UserRatingRepository extends BaseRepository<UserRatingEntity, CreateUserRatingDto, any> {
    constructor(@InjectRepository(UserRatingEntity) private repository: Repository<UserRatingEntity>) {
        super(repository);
    }
}
