import { UserTypeEnum } from "src/modules/data-interaction/database/enums/user-type.enum";

export interface JwtPayloadInterface {
    userId: string;
    userType: UserTypeEnum;
    iat: number;
    exp: number;
}
