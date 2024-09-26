import { BaseEntity } from "../../../../core/entities/base.entity";
import { FunctionTypeEnum } from "src/modules/backoffice/user/dto/functionTypeEnum";
import { UserBackofficeEntity } from "./user-backoffice.entity";
export declare class UserRolesBackofficeEntity extends BaseEntity {
    role: FunctionTypeEnum;
    description: string;
    active: boolean;
    user: UserBackofficeEntity;
}
