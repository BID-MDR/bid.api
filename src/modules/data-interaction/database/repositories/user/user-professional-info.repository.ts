import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateUserProfessionalInfoDto } from '../../dtos/user/user-professional-info/create-user-professional-info.dto';
import { UpdateUserProfessionalInfoDto } from '../../dtos/user/user-professional-info/update-user-professional-info.dto';
import { UserProfessionalInfoEntity } from '../../entitites/user-professional-info.entity';

@Injectable()
export class UserProfessionalInfoRepository extends BaseRepository<
    UserProfessionalInfoEntity,
    CreateUserProfessionalInfoDto,
    UpdateUserProfessionalInfoDto
> {
    constructor(
        @InjectRepository(UserProfessionalInfoEntity) private repository: Repository<UserProfessionalInfoEntity>,
    ) {
        super(repository);
    }
}
