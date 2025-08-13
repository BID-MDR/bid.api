import { BaseEntity } from "src/core/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
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
import { CompanyEntity } from "./company.entity";
import { EmployeeEntity } from "./employee.entity";
import { SatisfactionResearchEntity } from "./satisfaction-research.entity";
import { WorkRequestEntity } from "./work-request.entity";
import { ImprovementProjectEntity } from "./improvement-project.entity";
import { CostEstimateEntity } from "./cost-estimate.entity";
import { SurveyEntity } from "./survey.entity";
import { UnavailabilityEntity } from "./unavailability.entity";
import { RegisterWorkEntity } from "./register-work.entity";
import { ContractResignedEntity } from "./contract-resigned.entity";
import { ContractEntity } from "./contract.entity";


@Entity({ name: "user-teste" })
export class UserTesteEntity extends BaseEntity {
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

  //@OneToOne(() => AddressEntity, address => address.user, {
  //  cascade: true
  //})
  //@JoinColumn()
  //address: AddressEntity;

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
    default: '',
    nullable: true,
  })
  profilePicture?: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  password: string;

  //@OneToOne(() => UserBeneficiaryInfoEntity, beneficiaryUserInfo => beneficiaryUserInfo.user, {
  //  cascade: true
  //})
  //@JoinColumn()
  //beneficiaryUserInfo: UserBeneficiaryInfoEntity;
//
  //@OneToOne(() => UserProfessionalInfoEntity, professionalUserInfo => professionalUserInfo.user, {
  //  nullable: true,
  //  cascade: true
  //})
  //@JoinColumn()
  //professionalUserInfo: UserProfessionalInfoEntity;
//
  //@OneToMany(() => TechnicalVisitEntity, technicalVisit => technicalVisit.professional, {
  //  nullable: true,
  //  cascade: true
  //})
  //technicalVisitsAsProfessional: TechnicalVisitEntity[];
//
  //@OneToMany(() => UserAppointmentEntity, appointment => appointment.user, {
  //  nullable: true,
  //  cascade: true
  //})
  //appointments: UserAppointmentEntity[];
//
  //@OneToMany(() => TechnicalVisitEntity, technicalVisit => technicalVisit.beneficiary, {
  //  nullable: true,
  //  cascade: true
  //})
  //technicalVisitsAsBeneficiary: TechnicalVisitEntity[];
//
  //@OneToMany(() => NotificationEntity, notificationEntity => notificationEntity.user, {
  //  nullable: true,
  //  cascade: true
  //})
  //notificationUser: NotificationEntity[];
//
  //@OneToOne(() => UserOtpRequestEntity, otpRequest => otpRequest.user, {
  //  cascade: true,
  //  nullable: true,
  //})
  //@JoinColumn()
  //otpRequest: UserOtpRequestEntity;
//
  //@OneToMany(() => DemandEntity, demand => demand.beneficiary, {nullable: true, cascade: true})
  //demands?: DemandEntity[];
//
  //@OneToMany(() => MessageEntity, message => message.sender, {nullable: true, cascade: true})
  //sentMessages: MessageEntity[];
//
  //@OneToMany(() => MessageEntity, message => message.receiver, {nullable: true, cascade: true})
  //receivedMessages: MessageEntity[];
//
  //@OneToMany(() => HelpEntity, help => help.user, {nullable: true, cascade: true})
  //helpRequests: HelpEntity[];
//
  //@OneToOne(() => CompanyEntity, company => company.userAdmin, { nullable: true, cascade: true })
  //companyAdministrator: CompanyEntity;
//
  //@OneToOne(() => EmployeeEntity, employee => employee.user, { nullable: true, cascade: true })
  //employee: EmployeeEntity;
//
  //@OneToMany(() => SatisfactionResearchEntity, (satisfaction) => satisfaction.user, {nullable: true, cascade: true})
  //satisfaction: SatisfactionResearchEntity[];
//
  //@OneToOne(() => WorkRequestEntity, workRequest => workRequest.demand, {
  //  cascade: true,
  //  nullable: true,
  //})
  //@JoinColumn()
  //workRequest?: WorkRequestEntity;
//
  //@OneToOne(() => SurveyEntity, survey => survey.professional, {
  //  cascade: true,
  //  nullable: true,
  //})
  //@JoinColumn()
  //surveyProfessional: SurveyEntity;
  //
  //@OneToOne(() => SurveyEntity, survey => survey.beneficiary, {
  //  cascade: true,
  //  nullable: true,
  //})
//
  //surveybeneficiary?: SurveyEntity;

  //@OneToMany(() => ImprovementProjectEntity, workRequest => workRequest.professional, {
  //  cascade: true,
  //  nullable: true,
  //})
  //projects?: ImprovementProjectEntity[];
//
  //@OneToMany(() => CostEstimateEntity, costEstimate => costEstimate.professional, {
  //  cascade: true,
  //  nullable: true,
  //})
  //costEstimate?: CostEstimateEntity[];
//
  //@OneToMany(() => UnavailabilityEntity, unavailability => unavailability.user, {
  //  cascade: true,
  //  nullable: true,
  //})
  //unavailabilityList?: UnavailabilityEntity[];
//
  //@OneToMany(() => RegisterWorkEntity, (registerWork) => registerWork.professional, { cascade: true, nullable: true })
  //registerWorkList: RegisterWorkEntity[];
//
  //@OneToMany(() => ContractResignedEntity, (registerWork) => registerWork.professional, { cascade: true,  nullable: true })
  //contractResignedList: ContractResignedEntity[];
//
  //@OneToMany(() => ContractEntity, (contract) => contract.professional, { cascade: true,  nullable: true })
  //contractList: ContractEntity[];
}
