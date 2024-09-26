import { BaseEntity } from 'src/core/entities/base.entity';
import { UserEntity } from './user.entity';
import { UserRatingTypeEnum } from '../enums/user-rating-type.enum';
export declare class UserRatingEntity extends BaseEntity {
    professional: UserEntity;
    beneficiary: UserEntity;
    profesisonalInterationRating: number;
    programRating: number;
    platformRating: number;
    type: UserRatingTypeEnum;
}
