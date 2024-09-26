import { UserTypeEnum } from "src/modules/data-interaction/database/enums/user-type.enum";
export interface JwtPayloadInterface {
    userId: string;
    userType: UserTypeEnum;
    companyId?: string;
    iat: number;
    exp: number;
}
