import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserAppointmentTypeEnum } from '../enums/user-appointment-type.enum';

@Entity({ name: 'user-appointment' })
export class UserAppointmentEntity extends BaseEntity {
    @Column({
        type: 'date',
    })
    date: string;

    @Column({
        type: 'time',
    })
    timeFrom: string;

    @Column({
        type: 'time',
    })
    timeTo: string;

    @Column({
        type: 'enum',
        enum: UserAppointmentTypeEnum,
    })
    type: UserAppointmentTypeEnum;

    @ManyToOne(() => UserEntity, (user) => user.appointments)
    user: UserEntity;
}
