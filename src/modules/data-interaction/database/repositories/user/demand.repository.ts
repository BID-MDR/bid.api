import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { DemandEntity } from '../../entitites/demand.entity';
import { DemandRegisterRequestDto } from '../../dtos/demand/register-demand.dto';
import { UserEntity } from '../../entitites/user.entity';

@Injectable()
export class DemandRepository extends BaseRepository<DemandEntity, DemandRegisterRequestDto, DemandRegisterRequestDto> {
    constructor(@InjectRepository(DemandEntity) private repository: Repository<DemandEntity>) {
        super(repository);
    }

    async getById(_id: string) {
        return this.repository.findOne({ where: { id: _id } });
    }

    async listByUser(user: UserEntity): Promise<DemandEntity[]> {
        return await this.repository.createQueryBuilder('demand')
        .innerJoinAndSelect('demand.beneficiary', 'user')
        .where('user.id = :userId', { userId: user.id })
        .getMany();
       
    }
    async list() {
        return this.repository.find();
    }

   
}
