import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserTypeEnum } from '../enums/user-type.enum';
import { UserEntity } from './user.entity';
import { UserRatingTypeEnum } from '../enums/user-rating-type.enum';

@Entity({ name: 'user-rating' })
export class UserRatingEntity extends BaseEntity {
    @OneToOne(() => UserEntity)
    @JoinColumn()
    professional: UserEntity;

    @OneToOne(() => UserEntity)
    @JoinColumn()
    beneficiary: UserEntity;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    profesisonalInterationRating: number;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    programRating: number;

    @Column({
        type: 'tinyint',
        unsigned: true,
    })
    platformRating: number;

    @Column({
        type: 'enum',
        enum: UserTypeEnum,
    })
    type: UserRatingTypeEnum;
}
