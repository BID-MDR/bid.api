import { PortifolioTypeEnum } from '../../../enums/portifolio-type.enum';
import { CreateAddressDto } from '../../address/create-address.dto';
import { CreateUserRestingDayDto } from '../user-resting-day/create-user-resting-day.dto';
export declare class CreateUserProfessionalInfoDto {
    portifolioType: PortifolioTypeEnum;
    portifolioLink: string;
    about: string;
    gradYear: number;
    gradMonth: number;
    confeaRegistrationNumber: string;
    cauRegistrationNumber: string;
    restingDays: CreateUserRestingDayDto[];
    worksFrom: string;
    worksTo: string;
    addresses: CreateAddressDto[];
}
