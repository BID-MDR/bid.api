import { UpdateAddressDto } from '../address/update-address.dto';
import { CreateUserDto } from './create-user.dto';
import { CreateUserAppointmentDto } from './user-appointment/create-user-appointment.dto';
import { UpdateUserAppointmentDto } from './user-appointment/update-user-appointment.dto';
import { UpdateUserBeneficiaryInfoDto } from './user-beneficiary-info/update-user-beneficiary-info.dto';
import { UpdateUserProfessionalInfoDto } from './user-professional-info/update-user-professional-info.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Omit<Partial<CreateUserDto>, "address" | "cpf" | "password" | "beneficiaryUserInfo" | "professionalUserInfo">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    newAppointments: CreateUserAppointmentDto[];
    updateAppointments: UpdateUserAppointmentDto[];
    beneficiaryUserInfo: UpdateUserBeneficiaryInfoDto;
    professionalUserInfo: UpdateUserProfessionalInfoDto;
    address: UpdateAddressDto;
}
export {};
