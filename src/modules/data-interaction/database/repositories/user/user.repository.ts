import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UserEntity } from '../../entitites/user.entity';
import { UserTypeEnum } from '../../enums/user-type.enum';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
        super(repository);
    }

    async findByCpf(cpf: string) {
        return this.repository.findOne({ where: { cpf } });
    }

    async list() {
        return this.repository.find();
    }

    async getFirstBeneficiary() {
        return this.repository.findOne({
            order: {
                createdAt: 'ASC',
            },
            where: {
                type: UserTypeEnum.BENEFICIARIO,
            },
        });
    }
    
    async getFirstProfessional() {
        return this.repository.findOne({
            order: {
                createdAt: 'ASC',
            },
            where: {
                type: UserTypeEnum.PROFISSIONAL,
            },
        });
    }
}
