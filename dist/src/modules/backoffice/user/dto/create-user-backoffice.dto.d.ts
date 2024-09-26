import { UserBackofficeTypeEnum } from "./userTypeEnum";
import { UserRolesBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-roles-backoffice.entity";
import { UserStatusEnum } from "./userStatusEnum";
export declare class CreateUserBackofficeDto {
    constructor(partial: Partial<CreateUserBackofficeDto>);
    name: string;
    type: UserBackofficeTypeEnum;
    email: string;
    password: string;
    lastAccess: Date;
    timeView?: number;
    status: UserStatusEnum;
    rolesId: string[];
    roles: UserRolesBackofficeEntity[];
}
