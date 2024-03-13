import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserOtpStatusEnum } from '../enums/user-otp.enum';

@Entity({ name: 'user-otp-request' })
export class UserOtpRequestEntity extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 200,
    })
    token: string;

    @Column({
        type: 'enum',
        enum: UserOtpStatusEnum,
        default: UserOtpStatusEnum.PENDING,
    })
    status: UserOtpStatusEnum;

    @OneToOne(() => UserEntity, (user) => user.otpRequest)
    user: UserEntity;
}
