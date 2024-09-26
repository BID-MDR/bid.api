import { BaseEntity } from 'src/core/entities/base.entity';
import { PortifolioTypeEnum } from '../enums/portifolio-type.enum';
import { UserEntity } from './user.entity';
import { UserRestingDayEntity } from './user-resting-day.entity';
import { AddressEntity } from './address.entity';
export declare class UserProfessionalInfoEntity extends BaseEntity {
    portifolioType: PortifolioTypeEnum;
    about: string;
    portifolioLink: string;
    gradYear: number;
    gradMonth: number;
    confeaRegistrationNumber: string;
    cauRegistrationNumber: string;
    laborAvailability: boolean;
    materialPurchaseAndDeliveryAvailability: boolean;
    restingDays: UserRestingDayEntity[];
    worksFrom: string;
    worksTo: string;
    user: UserEntity;
    addresses: AddressEntity[];
}
