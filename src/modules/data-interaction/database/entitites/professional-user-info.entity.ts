import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { PortifolioTypeEnum } from '../enums/portifolio-type.enum';
import { UserEntity } from './user.entity';

@Entity()
export class ProfessionalUserInfoEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: PortifolioTypeEnum,
        default: PortifolioTypeEnum.WEBSITE,
    })
    portifolioType: PortifolioTypeEnum;

    @Column({
        type: 'varchar',
        length: 100,
    })
    portifolioLink: string;

    @OneToOne(() => UserEntity, (user) => user.professionalUserInfo)
    user: UserEntity;
}
