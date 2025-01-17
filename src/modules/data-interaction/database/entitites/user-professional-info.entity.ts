import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { PortifolioTypeEnum } from '../enums/portifolio-type.enum';
import { UserEntity } from './user.entity';
import { UserRestingDayEntity } from './user-resting-day.entity';
import { AddressEntity } from './address.entity';
import { LevelOfEducationEnum } from '../enums/level-of-education.enum';
import { RegisterWorkEntity } from './register-work.entity';
import { ContractResignedEntity } from './contract-resigned.entity';
import { ContractEntity } from './contract.entity';

@Entity({ name: 'user-professional-info' })
export class UserProfessionalInfoEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: PortifolioTypeEnum,
        default: PortifolioTypeEnum.WEBSITE,
    })
    portifolioType: PortifolioTypeEnum;

    @Column({
        type: 'varchar',
        length: 500,
    })
    about: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    portifolioLink: string;

    @Column({
        type: 'smallint',
        unsigned: true,
    })
    gradYear: number;

    @Column({
        type: 'smallint',
        unsigned: true,
    })
    gradMonth: number;

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
        default: true,
    })
    laborAvailability: boolean;

    @Column({
        type: 'boolean',
        default: false,
    })
    materialPurchaseAndDeliveryAvailability: boolean;

    @OneToMany(() => UserRestingDayEntity, (restingDay) => restingDay.userProfessionalInfo, {
        cascade: true,
        eager: true,
    })
    restingDays: UserRestingDayEntity[];

    @Column({
        type: 'varchar',
        length: 5,
    })
    worksFrom: string;

    @Column({
        type: 'varchar',
        length: 5,
    })
    worksTo: string;

    @OneToOne(() => UserEntity, (user) => user.professionalUserInfo)
    user: UserEntity;

    @OneToMany(() => AddressEntity, (address) => address.userProfessionalInfo, { cascade: true, eager: true })
    addresses: AddressEntity[];

    @OneToMany(() => RegisterWorkEntity, (registerWork) => registerWork.professional, { cascade: true, eager: true })
    registerWorkList: RegisterWorkEntity[];

    @OneToMany(() => ContractResignedEntity, (registerWork) => registerWork.professional, { cascade: true, eager: true })
    contractResignedList: ContractResignedEntity[];

    @OneToMany(() => ContractEntity, (contract) => contract.professional, { cascade: true, eager: true })
    contractList: ContractEntity[];
}
