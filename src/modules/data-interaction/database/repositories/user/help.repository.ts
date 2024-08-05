import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entitites/user.entity';
import { HelpEntity } from '../../entitites/help.entity';
import { HelpRegisterRequestDto } from '../../dtos/help/register-help.dto';

@Injectable()
export class HelpRepository extends BaseRepository<HelpEntity, HelpRegisterRequestDto, HelpRegisterRequestDto> {
    constructor(@InjectRepository(HelpEntity) private repository: Repository<HelpEntity>) {
        super(repository);
    }

    async getById(_id: string) {
        return this.repository.findOne({ where: { id: _id } });
    }

    async listAllMsgByUser(user: UserEntity): Promise<HelpEntity[]> {
        return await this.repository.createQueryBuilder('help')
            .innerJoinAndSelect('help.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .orderBy('help.sentAt', 'DESC')
            .getMany();
    }

    async list() {
        return this.repository.find();
    }

   
}
