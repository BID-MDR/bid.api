import { UserAppointmentTypeEnum } from '../../../enums/user-appointment-type.enum';
export declare class CreateUserAppointmentDto {
    from: Date;
    to: Date;
    type: UserAppointmentTypeEnum;
}
