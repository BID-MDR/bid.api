import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { LevelOfEducationEnum } from "../enums/level-of-education.enum";
import { MaritalStatusEnum } from "../enums/marital-status.enum";
import { RaceEnum } from "../enums/race.enum";
import { UserTypeEnum } from "../enums/user-type.enum";
import { AddressEntity } from "./address.entity";
import { TechnicalVisitEntity } from "./technical-visit.entity";
import { UserBeneficiaryInfoEntity } from "./user-beneficiary-info.entity";
import { UserProfessionalInfoEntity } from "./user-professional-info.entity";
import { UserAppointmentEntity } from "./user-appointment.entity";
import { UserOtpRequestEntity } from "./user-otp-request.entity";
import { UserBirthGenderEnum } from "../enums/user-birth-gender.enum";
import { UserGenderIdentityEnum } from "../enums/user-gender-identity.enum";
import { UserMonthlyFamilyIncomeEnum } from "../enums/user-monthly-family-income.enum";
import { NotificationEntity } from "./notification.entity";
import { UserProgramTypeEnum } from "../enums/user-program-type.enum";
import { DemandEntity } from "./demand.entity";
import { MessageEntity } from "./message.entity";
import { HelpEntity } from "./help.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
    @Column({
        type: "enum",
        enum: UserTypeEnum,
        default: UserTypeEnum.BENEFICIARIO,
    })
    type: UserTypeEnum;

    @Column({
        type: "varchar",
        length: 50,
    })
    name: string;

    @Column({
        type: "enum",
        enum: UserProgramTypeEnum,
        nullable: true,
    })
    programType: UserProgramTypeEnum;

    @Column({
        type: "varchar",
        length: 11,
    })
    cpf: string;

    @Column({
        type: "varchar",
        length: 15,
    })
    phone: string;

    @Column({
        type: "varchar",
        length: 50,
    })
    email: string;

    @OneToOne(() => AddressEntity, (address) => address.user, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    address: AddressEntity;

    @Column({
        type: "int",
        nullable: true,
    })
    age: number;

    @Column({
        type: "datetime",
        nullable: true,
    })
    birthDate: Date;

    @Column({
        type: "enum",
        enum: UserBirthGenderEnum,
    })
    birthGender: UserBirthGenderEnum;

    @Column({
        type: "enum",
        enum: UserGenderIdentityEnum,
    })
    genderIdentity: UserGenderIdentityEnum;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true,
    })
    customGenderIdentity: string;

    @Column({
        type: "enum",
        enum: LevelOfEducationEnum,
        default: LevelOfEducationEnum.FUNDAMENTAL_INCOMPLETO,
    })
    levelOfEducation: LevelOfEducationEnum;

    @Column({
        type: "enum",
        enum: MaritalStatusEnum,
        default: MaritalStatusEnum.OUTRO,
    })
    maritalStatus: MaritalStatusEnum;

    @Column({
        enum: UserMonthlyFamilyIncomeEnum,
        type: "enum",
        nullable: true,
    })
    monthlyFamilyIncome: UserMonthlyFamilyIncomeEnum;

    @Column({
        type: "enum",
        enum: RaceEnum,
        default: RaceEnum.NAO_DECLARADA,
    })
    race: RaceEnum;

    @Column({
        type: "varchar",
        length: 200,
    })
    profilePicture: string;

    @Column({
        type: "varchar",
        length: 100,
    })
    password: string;

    @OneToOne(
        () => UserBeneficiaryInfoEntity,
        (beneficiaryUserInfo) => beneficiaryUserInfo.user,
        {
            cascade: true,
            eager: true,
        },
    )
    @JoinColumn()
    beneficiaryUserInfo: UserBeneficiaryInfoEntity;

    @OneToOne(
        () => UserProfessionalInfoEntity,
        (professionalUserInfo) => professionalUserInfo.user,
        {
            cascade: true,
            eager: true,
        },
    )
    @JoinColumn()
    professionalUserInfo: UserProfessionalInfoEntity;

    @OneToMany(
        () => TechnicalVisitEntity,
        (technicalVisit) => technicalVisit.professional,
        {
            eager: true,
        },
    )
    technicalVisitsAsProfessional: TechnicalVisitEntity[];

    @OneToMany(() => UserAppointmentEntity, (appointment) => appointment.user, {
        eager: true,
        cascade: true,
    })
    appointments: UserAppointmentEntity[];

    @OneToMany(
        () => TechnicalVisitEntity,
        (technicalVisit) => technicalVisit.beneficiary,
        {
            eager: true,
        },
    )
    technicalVisitsAsBeneficiary: TechnicalVisitEntity[];

    @OneToOne(() => UserOtpRequestEntity, (otpRequest) => otpRequest.user, {
        eager: true,
        cascade: true,
        nullable: true,
    })
    @OneToMany(
        () => NotificationEntity,
        (notificationEntity) => notificationEntity.user,
        {
            eager: true,
        },
    )
    notificationUser: NotificationEntity[];
    @OneToOne(() => UserOtpRequestEntity, (otpRequest) => otpRequest.user, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    @JoinColumn()
    otpRequest: UserOtpRequestEntity;

    @OneToMany(() => DemandEntity, demand => demand.beneficiary)
    demands: DemandEntity[];

    @OneToMany(() => MessageEntity, (message) => message.sender)
    sentMessages: MessageEntity[];

    @OneToMany(() => MessageEntity, (message) => message.receiver)
    receivedMessages: MessageEntity[];
    @OneToMany(() => DemandEntity, demand => demand.professional)
    demandsAsProfessional: DemandEntity[];

    @OneToMany(() => HelpEntity, (help) => help.user)
    helpRequests: HelpEntity[];
}
