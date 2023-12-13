import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UserEntity } from '../../entitites/user.entity';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
        super(repository);
    }

    // async findUserWithAgendaById(id: string) {
    //     // select all database fields from user and join with appointments
    //     return await this.repository
    //         .createQueryBuilder('user')
    //         .leftJoinAndSelect('user.appointments', 'appointments')
    //         .where('user.id = :id', { id })
    //         .getOne();
    // }
}
