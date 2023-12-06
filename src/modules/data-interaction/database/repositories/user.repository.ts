import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { UserEntity } from '../entitites/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
        super(repository);
    }

    async getUserWithAgendaById(id: number) {
        return 'new Promise()';
    }
}
