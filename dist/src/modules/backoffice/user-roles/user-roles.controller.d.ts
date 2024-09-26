import { FeatureAuthService } from "src/modules/business-logic/feature-auth/feature-auth.service";
import { UserRoleService } from "./user-roles.service";
import { CreateUserBackofficeRoleDto } from "./dto/create-role-backoffice.dto";
export declare class UserRoleBackofficeController {
    private UserRoleService;
    private featureAuthService;
    private readonly _logger;
    constructor(UserRoleService: UserRoleService, featureAuthService: FeatureAuthService);
    register(dto: CreateUserBackofficeRoleDto): Promise<import("../../data-interaction/database/entitites/user-roles-backoffice.entity").UserRolesBackofficeEntity>;
    list(): Promise<import("../../data-interaction/database/entitites/user-roles-backoffice.entity").UserRolesBackofficeEntity[]>;
    activeEmployee(id: string): Promise<import("../../data-interaction/database/entitites/user-roles-backoffice.entity").UserRolesBackofficeEntity>;
    delete(id: string): Promise<void>;
}
