import { UserEntity } from '../../entitites/user.entity';
import { CompanyEntity } from '../../entitites/company.entity';
export declare class DemandRegisterRequestDto {
    document: string;
    state: string;
    city: string;
    zipcode: string;
    complement: string;
    neighborhood: string;
    number: string;
    street: string;
    latitude: string;
    longitude: string;
    beneficiary: UserEntity;
    company: CompanyEntity;
}
