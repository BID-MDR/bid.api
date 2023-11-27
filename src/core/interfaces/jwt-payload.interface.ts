import { RbacFuntionsEnum } from '../enums/rbac-functions.enum';

export interface JwtPayloadInterface {
    userId: string;
    iat: number;
    exp: number;
    roles: RbacFuntionsEnum[];
    // tfaRegistered: boolean;
    // tfaAuthenticate: boolean;
}
