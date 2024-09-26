import { BaseEntity } from 'src/core/entities/base.entity';
import { UserProfessionalInfoEntity } from './user-professional-info.entity';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';
export declare class AddressEntity extends BaseEntity {
    state: string;
    nickname: string;
    city: string;
    zipcode: string;
    complement: string;
    neighborhood: string;
    number: string;
    street: string;
    latitude: string;
    longitude: string;
    maximumDistanceToWorks: number;
    user: UserEntity;
    userProfessionalInfo: UserProfessionalInfoEntity;
    company: CompanyEntity;
}
