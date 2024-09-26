import { LevelOfEducationEnum } from '../../enums/level-of-education.enum';
import { MaritalStatusEnum } from '../../enums/marital-status.enum';
import { RaceEnum } from '../../enums/race.enum';
import { AddressResponseDto } from '../address/response-address.dto';
import { PortifolioTypeEnum } from '../../enums/portifolio-type.enum';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { BaseResponseDto } from 'src/core/dtos/crud/base-response.dto';
import { UserAppointmentTypeEnum } from '../../enums/user-appointment-type.enum';
declare class ProfessionalUserInfoResponseDto {
    portifolioType: PortifolioTypeEnum;
    portifolioLink: string;
    confeaRegistrationNumber: string;
    cauRegistrationNumber: string;
    laborAvailability: boolean;
    materialPurchaseAndDeliveryAvailability: boolean;
    laborValue: number;
}
declare class BeneficiaryUserInfoResponseDto {
    allowProfileListing: boolean;
}
declare class UserAppointmentDto {
    date: Date;
    timeFrom: string;
    timeTo: string;
    type: UserAppointmentTypeEnum;
}
export declare class UserResponseDto extends BaseResponseDto {
    name: string;
    type: UserTypeEnum;
    phone: string;
    email: string;
    cpf: string;
    addresses: AddressResponseDto[];
    age: number;
    birthGender: string;
    levelOfEducation: LevelOfEducationEnum;
    gradYear: number;
    maritalStatus: MaritalStatusEnum;
    monthlyFamilyIncome: number;
    race: RaceEnum;
    profilePicture: string;
    professionalUserInfo: ProfessionalUserInfoResponseDto;
    beneficiaryUserInfo: BeneficiaryUserInfoResponseDto;
    appointments: UserAppointmentDto[];
}
export {};
