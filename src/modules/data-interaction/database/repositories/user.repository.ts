import { BaseRepository } from 'src/core/repositories/base.repository';
import { UserEntity } from '../entitites/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';

export class UserRepository extends BaseRepository<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(repository: Repository<UserEntity>) {
        super(repository);
    }
}
