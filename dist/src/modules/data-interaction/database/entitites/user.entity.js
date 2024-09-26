"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const level_of_education_enum_1 = require("../enums/level-of-education.enum");
const marital_status_enum_1 = require("../enums/marital-status.enum");
const race_enum_1 = require("../enums/race.enum");
const user_type_enum_1 = require("../enums/user-type.enum");
const address_entity_1 = require("./address.entity");
const technical_visit_entity_1 = require("./technical-visit.entity");
const user_beneficiary_info_entity_1 = require("./user-beneficiary-info.entity");
const user_professional_info_entity_1 = require("./user-professional-info.entity");
const user_appointment_entity_1 = require("./user-appointment.entity");
const user_otp_request_entity_1 = require("./user-otp-request.entity");
const user_birth_gender_enum_1 = require("../enums/user-birth-gender.enum");
const user_gender_identity_enum_1 = require("../enums/user-gender-identity.enum");
const user_monthly_family_income_enum_1 = require("../enums/user-monthly-family-income.enum");
const notification_entity_1 = require("./notification.entity");
const user_program_type_enum_1 = require("../enums/user-program-type.enum");
const demand_entity_1 = require("./demand.entity");
const message_entity_1 = require("./message.entity");
const help_entity_1 = require("./help.entity");
const company_entity_1 = require("./company.entity");
const employee_entity_1 = require("./employee.entity");
const satisfaction_research_entity_1 = require("./satisfaction-research.entity");
let UserEntity = class UserEntity extends base_entity_1.BaseEntity {
    type;
    name;
    programType;
    cpf;
    phone;
    email;
    address;
    age;
    birthDate;
    birthGender;
    genderIdentity;
    customGenderIdentity;
    levelOfEducation;
    maritalStatus;
    monthlyFamilyIncome;
    race;
    profilePicture;
    password;
    beneficiaryUserInfo;
    professionalUserInfo;
    technicalVisitsAsProfessional;
    appointments;
    technicalVisitsAsBeneficiary;
    notificationUser;
    otpRequest;
    demands;
    sentMessages;
    receivedMessages;
    helpRequests;
    companyAdministrator;
    employee;
    satisfaction;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: user_type_enum_1.UserTypeEnum,
        default: user_type_enum_1.UserTypeEnum.BENEFICIARIO,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: user_program_type_enum_1.UserProgramTypeEnum,
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "programType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 11,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 15,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.AddressEntity, address => address.user, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.AddressEntity)
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: user_birth_gender_enum_1.UserBirthGenderEnum,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "birthGender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: user_gender_identity_enum_1.UserGenderIdentityEnum,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "genderIdentity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "customGenderIdentity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: level_of_education_enum_1.LevelOfEducationEnum,
        default: level_of_education_enum_1.LevelOfEducationEnum.FUNDAMENTAL_INCOMPLETO,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "levelOfEducation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: marital_status_enum_1.MaritalStatusEnum,
        default: marital_status_enum_1.MaritalStatusEnum.OUTRO,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "maritalStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: user_monthly_family_income_enum_1.UserMonthlyFamilyIncomeEnum,
        type: "enum",
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "monthlyFamilyIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: race_enum_1.RaceEnum,
        default: race_enum_1.RaceEnum.NAO_DECLARADA,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "race", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 200,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_beneficiary_info_entity_1.UserBeneficiaryInfoEntity, beneficiaryUserInfo => beneficiaryUserInfo.user, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_beneficiary_info_entity_1.UserBeneficiaryInfoEntity)
], UserEntity.prototype, "beneficiaryUserInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_professional_info_entity_1.UserProfessionalInfoEntity, professionalUserInfo => professionalUserInfo.user, {
        cascade: true,
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_professional_info_entity_1.UserProfessionalInfoEntity)
], UserEntity.prototype, "professionalUserInfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => technical_visit_entity_1.TechnicalVisitEntity, technicalVisit => technicalVisit.professional, {
        eager: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "technicalVisitsAsProfessional", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_appointment_entity_1.UserAppointmentEntity, appointment => appointment.user, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => technical_visit_entity_1.TechnicalVisitEntity, technicalVisit => technicalVisit.beneficiary, {
        eager: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "technicalVisitsAsBeneficiary", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.NotificationEntity, notificationEntity => notificationEntity.user, {
        eager: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "notificationUser", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_otp_request_entity_1.UserOtpRequestEntity, otpRequest => otpRequest.user, {
        cascade: true,
        eager: true,
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_otp_request_entity_1.UserOtpRequestEntity)
], UserEntity.prototype, "otpRequest", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demand_entity_1.DemandEntity, demand => demand.beneficiary),
    __metadata("design:type", Array)
], UserEntity.prototype, "demands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, message => message.sender),
    __metadata("design:type", Array)
], UserEntity.prototype, "sentMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_entity_1.MessageEntity, message => message.receiver),
    __metadata("design:type", Array)
], UserEntity.prototype, "receivedMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => help_entity_1.HelpEntity, help => help.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "helpRequests", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => company_entity_1.CompanyEntity, company => company.userAdmin, { nullable: true }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], UserEntity.prototype, "companyAdministrator", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => employee_entity_1.EmployeeEntity, employee => employee.user, { nullable: true }),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], UserEntity.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => satisfaction_research_entity_1.SatisfactionResearchEntity, (satisfaction) => satisfaction.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "satisfaction", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "user" })
], UserEntity);
//# sourceMappingURL=user.entity.js.map