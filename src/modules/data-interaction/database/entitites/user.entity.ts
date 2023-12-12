import { BaseEntity } from 'src/core/entities/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { LevelOfEducationEnum } from '../enums/level-of-education.enum';
import { MaritalStatusEnum } from '../enums/marital-status.enum';
import { RaceEnum } from '../enums/race.enum';
import { UserTypeEnum } from '../enums/user-type.enum';
import { AddressEntity } from './address.entity';
import { CostEstimationEntity } from './cost-estimation.entity';
import { TechnicalVisitEntity } from './technical-visit.entity';
import { WorkRequestEntity } from './work-request.entity';
import { UserBeneficiaryInfoEntity } from './user-beneficiary-info.entity';
import { UserProfessionalInfoEntity } from './user-professional-info.entity';
import { UserAppointmentEntity } from './user-appointment.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: UserTypeEnum,
        default: UserTypeEnum.BENEFICIARIO,
    })
    type: UserTypeEnum;

    @Column({
        type: 'varchar',
        length: 50,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 15,
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 50,
    })
    email: string;

    @OneToMany(() => AddressEntity, (address) => address.user, { cascade: true, eager: true })
    addresses: AddressEntity[];

    @Column({
        type: 'int',
    })
    age: number;

    @Column({
        type: 'char',
    })
    birthGender: string;

    @Column({
        type: 'enum',
        enum: LevelOfEducationEnum,
        default: LevelOfEducationEnum.FUNDAMENTAL_INCOMPLETO,
    })
    levelOfEducation: LevelOfEducationEnum;

    @Column({
        type: 'smallint',
        unsigned: true,
    })
    gradYear: number;

    @Column({
        type: 'enum',
        enum: MaritalStatusEnum,
        default: MaritalStatusEnum.OUTRO,
    })
    maritalStatus: MaritalStatusEnum;

    @Column({
        type: 'decimal',
        unsigned: true,
        precision: 10,
        scale: 2,
    })
    monthlyFamilyIncome: number;

    @Column({
        type: 'enum',
        enum: RaceEnum,
        default: RaceEnum.NAO_DECLARADA,
    })
    race: RaceEnum;

    @Column({
        type: 'varchar',
        length: 200,
    })
    profilePicture: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    password: string;

    @OneToOne(() => UserBeneficiaryInfoEntity, (beneficiaryUserInfo) => beneficiaryUserInfo.user, {
        cascade: true,
        nullable: true,
        eager: true,
    })
    @JoinColumn()
    beneficiaryUserInfo: UserBeneficiaryInfoEntity;

    @OneToOne(() => UserProfessionalInfoEntity, (professionalUserInfo) => professionalUserInfo.user, {
        cascade: true,
        nullable: true,
        eager: true,
    })
    @JoinColumn()
    professionalUserInfo: UserProfessionalInfoEntity;

    @OneToMany(() => TechnicalVisitEntity, (technicalVisit) => technicalVisit.professional, {
        eager: true,
    })
    technicalVisitsAsProfessional: TechnicalVisitEntity[];

    @OneToMany(() => UserAppointmentEntity, (appointment) => appointment.user, {
        eager: true,
        cascade: true,
    })
    appointments: UserAppointmentEntity[];

    @OneToMany(() => TechnicalVisitEntity, (technicalVisit) => technicalVisit.beneficiary, {
        eager: true,
    })
    technicalVisitsAsBeneficiary: TechnicalVisitEntity[];

    @OneToMany(() => CostEstimationEntity, (costEstimation) => costEstimation.professional, {
        eager: true,
    })
    costEstimationsAsProfessional: CostEstimationEntity[];

    @OneToOne(() => WorkRequestEntity, (workRequest) => workRequest.beneficiary)
    workRequest: WorkRequestEntity;
}
