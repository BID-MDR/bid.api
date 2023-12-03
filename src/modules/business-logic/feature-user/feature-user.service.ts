import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { UpdateUserDto } from 'src/modules/data-interaction/database/dtos/user/update-user.dto';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user.repository';
import { CaubFacade } from 'src/modules/data-interaction/facade/apis/gov/caubr/caub.facade';
import { CaubRegistrationResponseDto } from './dtos/caub-resgistration-reponse.dto';

@Injectable()
export class FeatureUserService extends BaseService<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(repository: UserRepository, private readonly caubFacade: CaubFacade) {
        super(repository);
    }

    async checkProfessionalUserCaubRegistration(cpf: string): Promise<CaubRegistrationResponseDto> {
        return this.caubFacade.getProfessionalRegistrationStatusFromCaub(cpf);
    }
}
