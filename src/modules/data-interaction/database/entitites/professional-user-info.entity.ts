import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { PortifolioTypeEnum } from '../enums/portifolio-type.enum';
import { UserEntity } from './user.entity';

@Entity({ name: 'professional-user-info' })
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

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    confeaRegistrationNumber: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: true,
    })
    cauRegistrationNumber: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    laborAvailability: boolean;

    @Column({
        type: 'boolean',
        default: false,
    })
    materialPurchaseAndDeliveryAvailability: boolean;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    laborValue: number;

    @OneToOne(() => UserEntity, (user) => user.professionalUserInfo)
    user: UserEntity;
}
