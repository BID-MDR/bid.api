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
exports.UserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const level_of_education_enum_1 = require("../../enums/level-of-education.enum");
const marital_status_enum_1 = require("../../enums/marital-status.enum");
const race_enum_1 = require("../../enums/race.enum");
const response_address_dto_1 = require("../address/response-address.dto");
const portifolio_type_enum_1 = require("../../enums/portifolio-type.enum");
const user_type_enum_1 = require("../../enums/user-type.enum");
const base_response_dto_1 = require("../../../../../core/dtos/crud/base-response.dto");
const user_appointment_type_enum_1 = require("../../enums/user-appointment-type.enum");
class ProfessionalUserInfoResponseDto {
    portifolioType;
    portifolioLink;
    confeaRegistrationNumber;
    cauRegistrationNumber;
    laborAvailability;
    materialPurchaseAndDeliveryAvailability;
    laborValue;
}
__decorate([
    (0, swagger_1.ApiProperty)({ enum: portifolio_type_enum_1.PortifolioTypeEnum }),
    __metadata("design:type", String)
], ProfessionalUserInfoResponseDto.prototype, "portifolioType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfessionalUserInfoResponseDto.prototype, "portifolioLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfessionalUserInfoResponseDto.prototype, "confeaRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProfessionalUserInfoResponseDto.prototype, "cauRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProfessionalUserInfoResponseDto.prototype, "laborAvailability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ProfessionalUserInfoResponseDto.prototype, "materialPurchaseAndDeliveryAvailability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProfessionalUserInfoResponseDto.prototype, "laborValue", void 0);
class BeneficiaryUserInfoResponseDto {
    allowProfileListing;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], BeneficiaryUserInfoResponseDto.prototype, "allowProfileListing", void 0);
class UserAppointmentDto {
    date;
    timeFrom;
    timeTo;
    type;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UserAppointmentDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserAppointmentDto.prototype, "timeFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserAppointmentDto.prototype, "timeTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_appointment_type_enum_1.UserAppointmentTypeEnum }),
    __metadata("design:type", String)
], UserAppointmentDto.prototype, "type", void 0);
let UserResponseDto = class UserResponseDto extends base_response_dto_1.BaseResponseDto {
    name;
    type;
    phone;
    email;
    cpf;
    addresses;
    age;
    birthGender;
    levelOfEducation;
    gradYear;
    maritalStatus;
    monthlyFamilyIncome;
    race;
    profilePicture;
    professionalUserInfo;
    beneficiaryUserInfo;
    appointments;
};
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_type_enum_1.UserTypeEnum }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: response_address_dto_1.AddressResponseDto, isArray: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UserResponseDto.prototype, "addresses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "birthGender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: level_of_education_enum_1.LevelOfEducationEnum,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "levelOfEducation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "gradYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: marital_status_enum_1.MaritalStatusEnum,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "monthlyFamilyIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: race_enum_1.RaceEnum,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "race", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ProfessionalUserInfoResponseDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", ProfessionalUserInfoResponseDto)
], UserResponseDto.prototype, "professionalUserInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => BeneficiaryUserInfoResponseDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", BeneficiaryUserInfoResponseDto)
], UserResponseDto.prototype, "beneficiaryUserInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserAppointmentDto, isArray: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], UserResponseDto.prototype, "appointments", void 0);
exports.UserResponseDto = UserResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], UserResponseDto);
//# sourceMappingURL=reponse-user.dto.js.map