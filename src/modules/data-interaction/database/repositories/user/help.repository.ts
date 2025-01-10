import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entitites/user.entity';
import { HelpEntity } from '../../entitites/help.entity';
import { HelpRegisterRequestDto } from '../../dtos/help/register-help.dto';
import { addMonths } from 'date-fns';
import { UserProgramTypeEnum } from '../../enums/user-program-type.enum';

@Injectable()
export class HelpRepository extends BaseRepository<HelpEntity, any, any> {
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
        return this.repository.find({where: {programType: UserProgramTypeEnum.REGMEL}});
    }

    async listMcmv() {
        return this.repository.find({where: {programType: UserProgramTypeEnum.MINHA_CASA}});
    }

    async findMonth(month: number) {
        const now = new Date();
        const pastDate = addMonths(now, -month);
    
    
        return this.repository.createQueryBuilder('help')
        .where('help.createdAt BETWEEN :pastDate AND :now', {
          pastDate: pastDate.toISOString(),
          now: now.toISOString(),
        })
        .andWhere('help.programType = :programType', {programType: UserProgramTypeEnum.REGMEL})
        .getMany()
    }

    async findMonthMcmv(month: number) {
        const now = new Date();
        const pastDate = addMonths(now, -month);
    
    
        return this.repository.createQueryBuilder('help')
        .where('help.createdAt BETWEEN :pastDate AND :now', {
          pastDate: pastDate.toISOString(),
          now: now.toISOString(),
        })
        .andWhere('help.programType = :programType', {programType: UserProgramTypeEnum.MINHA_CASA})
        .getMany()
    }

   
}
