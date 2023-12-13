import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { UserRestingDayEntity } from '../../entitites/user-resting-day.entity';
import { CreateUserRestingDayDto } from '../../dtos/user/user-resting-day/create-user-resting-day.dto';

@Injectable()
export class UseRestingDayRepository extends BaseRepository<UserRestingDayEntity, CreateUserRestingDayDto, any> {
    constructor(@InjectRepository(UserRestingDayEntity) private repository: Repository<UserRestingDayEntity>) {
        super(repository);
    }

    async findAllByUserProfessionalInfoId(userProfessionalInfoId: string): Promise<UserRestingDayEntity[]> {
        return await this.repository.find({
            where: {
                userProfessionalInfo: {
                    id: userProfessionalInfoId,
                },
            },
        });
    }
}
