import { BaseEntity } from 'src/core/entities/base.entity';
import { GovbrSsoInfoToRegisterEntity } from './govbr-sso-info-to-register.entity';
export declare class GovbrSsoEntity extends BaseEntity {
    codeVerifier: string;
    codeChallenge: string;
    token: string;
    registered: boolean;
    infoToRegister: GovbrSsoInfoToRegisterEntity;
}
