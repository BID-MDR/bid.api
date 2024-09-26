import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from './user.entity';
import { UserOtpStatusEnum } from '../enums/user-otp.enum';
export declare class UserOtpRequestEntity extends BaseEntity {
    token: string;
    status: UserOtpStatusEnum;
    user: UserEntity;
}
