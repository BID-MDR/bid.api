import { UserRolesBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-roles-backoffice.entity";
export interface JwtPayloadBackoffice {
    userId: string;
    email: string;
    roles: UserRolesBackofficeEntity[];
}
