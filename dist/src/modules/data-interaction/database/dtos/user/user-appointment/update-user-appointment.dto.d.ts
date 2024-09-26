import { CreateUserAppointmentDto } from './create-user-appointment.dto';
declare const UpdateUserAppointmentDto_base: import("@nestjs/common").Type<Omit<CreateUserAppointmentDto, "type">>;
export declare class UpdateUserAppointmentDto extends UpdateUserAppointmentDto_base {
    id: string;
}
export {};
