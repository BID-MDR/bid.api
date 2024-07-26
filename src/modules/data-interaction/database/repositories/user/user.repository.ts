import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/user/create-user.dto';
import { UpdateUserDto } from '../../dtos/user/update-user.dto';
import { UserEntity } from '../../entitites/user.entity';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { UserProgramTypeEnum } from '../../enums/user-program-type.enum';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {
        super(repository);
    }

    async findByCpf(cpf: string) {
        return this.repository.findOne({ where: { cpf } });
    }

    async getById(_id: string) {
        return this.repository.findOne({ where: { id: _id } });
    }

    async updateUserProgramType(_id: string, programType: UserProgramTypeEnum) {
        return this.repository.update(_id, { programType });
    }

    async list() {
        return this.repository.find();
    }

    async getByCpf(cpf: string) {
        return this.repository.findOne({ where: { cpf } });
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

    async updateProfilePicture(userId: string, pictureProfile: string) {
        return this.repository.update({
            id: userId
        }, { profilePicture: pictureProfile });
    }
    async getDashboardDataWithJoinBeneficiary(userId: string) {
        return await this.repository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.beneficiaryUserInfo', 'user-beneficiary-info')
            .leftJoinAndSelect('user.technicalVisitsAsBeneficiary', 'technical-visit')
            .where('user.id = :userId', { userId })
            .getOne();
    }
    async getDashboardDataWithJoinProfessional(userId: string) {
        return await this.repository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.userProfessionalInfo', 'user-professional-info')
            .leftJoinAndSelect('user.technicalVisitsAsProfessional', 'technical-visit')
            .where('user.id = :userId', { userId })
            .getOne();
    }

}
