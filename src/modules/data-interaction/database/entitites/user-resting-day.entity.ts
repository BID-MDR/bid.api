import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserProfessionalInfoEntity } from './user-professional-info.entity';
import { RestingDayEnum } from '../enums/resting-day.enum';

@Entity({ name: 'user-resting-day' })
export class UserRestingDayEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: RestingDayEnum,
    })
    day: RestingDayEnum;

    @ManyToOne(() => UserProfessionalInfoEntity, (userProfessionalInfo) => userProfessionalInfo.restingDays)
    userProfessionalInfo: UserProfessionalInfoEntity;
}
