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
export declare class UserRoleService extends BaseService<UserRolesBackofficeEntity, CreateUserBackofficeRoleDto, any> {
    private userRolesBackofficeRepository;
    private userBackofficeRepository;
    private readonly caubFacade;
    private readonly confeaFacade;
    private readonly emailFacade;
    private readonly storageFacade;
    private readonly configService;
    constructor(userRolesBackofficeRepository: UserRolesBackofficeRepository, userBackofficeRepository: UserBackofficeRepository, caubFacade: CaubFacade, confeaFacade: ConfeaFacade, emailFacade: EmailFacade, storageFacade: StorageFacade, configService: ConfigService);
    create(data: CreateUserBackofficeRoleDto): Promise<UserRolesBackofficeEntity>;
    activeRole(roleId: string): Promise<UserRolesBackofficeEntity>;
    findByName(name: FunctionTypeEnum): Promise<UserRolesBackofficeEntity>;
    list(): Promise<UserRolesBackofficeEntity[]>;
    hardDelete(id: string): Promise<void>;
}
