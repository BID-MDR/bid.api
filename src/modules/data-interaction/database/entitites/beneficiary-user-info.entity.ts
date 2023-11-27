import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class BeneficiaryUserInfoEntity extends BaseEntity {
    @Column({
        type: 'boolean',
        default: false,
    })
    allowProfileListing: boolean;

    @OneToOne(() => UserEntity, (user) => user.beneficiaryUserInfo)
    user: UserEntity;
}
