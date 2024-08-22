import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BaseService } from "src/core/services/base.service";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { EmailFacade } from "src/modules/data-interaction/facade/apis/email/email.facade";
import { CaubFacade } from "src/modules/data-interaction/facade/apis/gov/caubr/caub.facade";
import { ConfeaFacade } from "src/modules/data-interaction/facade/apis/gov/confea/confea.facade";
import { StorageFacade } from "src/modules/data-interaction/facade/apis/storage/storage.facade";
import { UserRolesBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-roles-backoffice.entity";
import { UserRolesBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user-roles.repository";
import { CreateUserBackofficeRoleDto } from "./dto/create-role-backoffice.dto";
import { FunctionTypeEnum } from "../user/dto/functionTypeEnum";

@Injectable()
export class UserRoleService extends BaseService<UserRolesBackofficeEntity, CreateUserBackofficeRoleDto, any> {
    constructor(
        private userRolesBackofficeRepository: UserRolesBackofficeRepository,
        private userBackofficeRepository: UserBackofficeRepository,

        private readonly caubFacade: CaubFacade,
        private readonly confeaFacade: ConfeaFacade,
        private readonly emailFacade: EmailFacade,
        private readonly storageFacade: StorageFacade,
        private readonly configService: ConfigService,
    ) {
        super(userRolesBackofficeRepository);
    }

    async create(data: CreateUserBackofficeRoleDto): Promise<UserRolesBackofficeEntity> {
        return await super.create(data);
    }

    async activeRole(roleId: string): Promise<UserRolesBackofficeEntity> {
        
        const userRole = await this.userRolesBackofficeRepository.findById(roleId);
    
        if (!userRole) throw new BadRequestException("Função não encontrada.");
    
        return await this.userRolesBackofficeRepository.update(roleId, { active: 1 });
    }

    async findByName(name:FunctionTypeEnum): Promise<UserRolesBackofficeEntity>{
        return await this.userRolesBackofficeRepository.findByName(name)
    }
    
    async list(): Promise<UserRolesBackofficeEntity[]> {
    return await this.userRolesBackofficeRepository.findAll();
    }

    async hardDelete(id: string): Promise<void> {
    return await this.userRolesBackofficeRepository.hardDelete(id);
    }

}