import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { UpdateUserDto } from 'src/modules/data-interaction/database/dtos/user/update-user.dto';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user.repository';

@Injectable()
export class FeatureUserService extends BaseService<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(repository: UserRepository) {
        super(repository);
    }
}
