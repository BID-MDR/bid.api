import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { CreateUserDto } from 'src/modules/data-interaction/database/dtos/user/create-user.dto';
import { UpdateUserDto } from 'src/modules/data-interaction/database/dtos/user/update-user.dto';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user.repository';
import { CaubFacade } from 'src/modules/data-interaction/facade/apis/gov/caubr/caub.facade';
import { ProfessionalCouncilRegistrationResponseDto } from './dtos/professional-council-resgistration-reponse.dto';
import * as bcrypt from 'bcrypt';
import { ConfeaFacade } from 'src/modules/data-interaction/facade/apis/gov/confea/confea.facade';

@Injectable()
export class FeatureUserService extends BaseService<UserEntity, CreateUserDto, UpdateUserDto> {
    constructor(
        private repository: UserRepository,
        private readonly caubFacade: CaubFacade,
        private readonly confeaFacade: ConfeaFacade,
    ) {
        super(repository);
    }

    async checkProfessionalUserCaubRegistration(cpf: string): Promise<ProfessionalCouncilRegistrationResponseDto> {
        return this.caubFacade.getProfessionalRegistrationStatusFromCaub(cpf);
    }

    async checkProfessionalUserConfeaRegistration(cpf: string): Promise<ProfessionalCouncilRegistrationResponseDto> {
        return this.confeaFacade.getProfessionalRegistrationStatusFromConfea(cpf);
    }

    async getUserWithAgendaById(id: number) {
        return this.repository.getUserWithAgendaById(id);
    }

    async create(data: CreateUserDto): Promise<UserEntity> {
        data.password = await this.hashPassword(data.password);

        return await super.create(data);
    }

    async updatePasswordRequest(userId: number) {}

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 13);
    }
}
