import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from './user.entity';
import { UserAppointmentTypeEnum } from '../enums/user-appointment-type.enum';
export declare class UserAppointmentEntity extends BaseEntity {
    from: Date;
    to: Date;
    type: UserAppointmentTypeEnum;
    user: UserEntity;
}
