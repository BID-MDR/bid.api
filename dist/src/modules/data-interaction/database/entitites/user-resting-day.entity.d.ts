import { BaseEntity } from 'src/core/entities/base.entity';
import { UserProfessionalInfoEntity } from './user-professional-info.entity';
import { RestingDayEnum } from '../enums/resting-day.enum';
export declare class UserRestingDayEntity extends BaseEntity {
    day: RestingDayEnum;
    userProfessionalInfo: UserProfessionalInfoEntity;
}
