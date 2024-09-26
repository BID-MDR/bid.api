import { BaseEntity } from "src/core/entities/base.entity";
import { UserBackofficeTypeEnum } from "src/modules/backoffice/user/dto/userTypeEnum";
import { UserRolesBackofficeEntity } from "./user-roles-backoffice.entity";
import { UserStatusEnum } from "src/modules/backoffice/user/dto/userStatusEnum";
import { MessageBackofficeEntity } from "./message-backoffice.entity";
export declare class UserBackofficeEntity extends BaseEntity {
    type: UserBackofficeTypeEnum;
    name: string;
    email: string;
    password: string;
    lastAccess: Date;
    timeView: number;
    status: UserStatusEnum;
    sentMessages: MessageBackofficeEntity[];
    receivedMessages: MessageBackofficeEntity[];
    roles: UserRolesBackofficeEntity[];
}
