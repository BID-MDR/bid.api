import { GovbrSsoEntity } from './govbr-sso.entity';
import { BaseEntity } from 'src/core/entities/base.entity';
export declare class GovbrSsoInfoToRegisterEntity extends BaseEntity {
    name: string;
    cpf: string;
    email: string;
    phone: string;
    govbrSso: GovbrSsoEntity;
    constructor(name: string, cpf: string, email: string, phone: string);
}
