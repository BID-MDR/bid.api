import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { UserRestingDayEntity } from '../../entitites/user-resting-day.entity';
import { CreateUserRestingDayDto } from '../../dtos/user/user-resting-day/create-user-resting-day.dto';
export declare class UseRestingDayRepository extends BaseRepository<UserRestingDayEntity, CreateUserRestingDayDto, any> {
    private repository;
    constructor(repository: Repository<UserRestingDayEntity>);
    findAllByUserProfessionalInfoId(userProfessionalInfoId: string): Promise<UserRestingDayEntity[]>;
}
