import {  Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { DemandEntity } from 'src/modules/data-interaction/database/entitites/demand.entity';
import { DemandRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/demand/register-demand.dto';
import { DemandRepository } from 'src/modules/data-interaction/database/repositories/user/demand.repository';

@Injectable()
export class DemandService extends BaseService<
    DemandEntity,
    DemandRegisterRequestDto,
    DemandRegisterRequestDto
> {
    constructor(
        private demandRepository: DemandRepository,
        private readonly userRepository: UserRepository,
    ) {
        super(demandRepository);
    }

    async listByUser(userId: string) {
        const user = await this.userRepository.getById(userId);
        return await this.demandRepository.listByUser(user);
    }

    async list() {
    
        return await this.demandRepository.list();
    }

    async register(userId: string, data: DemandRegisterRequestDto) {
        data.beneficiary = await this.userRepository.getById(userId);
        return await super.create(data);
    }

    async delete(demandId: string) {
        return await this.demandRepository.hardDelete(demandId);
    }
    
}
