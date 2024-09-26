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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const brazilian_class_validator_1 = require("brazilian-class-validator");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const level_of_education_enum_1 = require("../../enums/level-of-education.enum");
const marital_status_enum_1 = require("../../enums/marital-status.enum");
const race_enum_1 = require("../../enums/race.enum");
const user_birth_gender_enum_1 = require("../../enums/user-birth-gender.enum");
const user_type_enum_1 = require("../../enums/user-type.enum");
const create_address_dto_1 = require("../address/create-address.dto");
const media_upload_dto_1 = require("../media/media-upload.dto");
const create_user_beneficiary_info_dto_1 = require("./user-beneficiary-info/create-user-beneficiary-info.dto");
const create_user_professional_info_dto_1 = require("./user-professional-info/create-user-professional-info.dto");
const user_gender_identity_enum_1 = require("../../enums/user-gender-identity.enum");
const user_monthly_family_income_enum_1 = require("../../enums/user-monthly-family-income.enum");
class CreateUserDto {
    name;
    type;
    phone;
    email;
    cpf;
    address;
    age;
    birthGender;
    birthDate;
    genderIdentity;
    customGenderIdentity;
    levelOfEducation;
    maritalStatus;
    monthlyFamilyIncome;
    race;
    uploadedProfilePicture;
    password;
    beneficiaryUserInfo;
    professionalUserInfo;
    profilePicture;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(1, 70),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_type_enum_1.UserTypeEnum }),
    (0, class_validator_1.IsEnum)(user_type_enum_1.UserTypeEnum),
    __metadata("design:type", String)
], CreateUserDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+5511999999999' }),
    (0, class_validator_1.IsPhoneNumber)('BR'),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@email.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345678901' }),
    (0, brazilian_class_validator_1.IsCPF)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: create_address_dto_1.CreateAddressDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_address_dto_1.CreateAddressDto),
    __metadata("design:type", create_address_dto_1.CreateAddressDto)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 18 }),
    (0, class_validator_1.Min)(18),
    (0, class_validator_1.Max)(120),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_birth_gender_enum_1.UserBirthGenderEnum }),
    (0, class_validator_1.IsEnum)(user_birth_gender_enum_1.UserBirthGenderEnum),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthGender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1999-12-31' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_gender_identity_enum_1.UserGenderIdentityEnum }),
    (0, class_validator_1.IsEnum)(user_gender_identity_enum_1.UserGenderIdentityEnum),
    __metadata("design:type", String)
], CreateUserDto.prototype, "genderIdentity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Boeing AH-64 Apache' }),
    (0, class_validator_1.Length)(0, 100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "customGenderIdentity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: level_of_education_enum_1.LevelOfEducationEnum }),
    (0, class_validator_1.IsEnum)(level_of_education_enum_1.LevelOfEducationEnum),
    __metadata("design:type", String)
], CreateUserDto.prototype, "levelOfEducation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: marital_status_enum_1.MaritalStatusEnum }),
    (0, class_validator_1.IsEnum)(marital_status_enum_1.MaritalStatusEnum),
    __metadata("design:type", String)
], CreateUserDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_monthly_family_income_enum_1.UserMonthlyFamilyIncomeEnum }),
    (0, class_validator_1.IsEnum)(user_monthly_family_income_enum_1.UserMonthlyFamilyIncomeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "monthlyFamilyIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: race_enum_1.RaceEnum }),
    (0, class_validator_1.IsEnum)(race_enum_1.RaceEnum),
    __metadata("design:type", String)
], CreateUserDto.prototype, "race", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: media_upload_dto_1.MediaUploadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => media_upload_dto_1.MediaUploadDto),
    __metadata("design:type", media_upload_dto_1.MediaUploadDto)
], CreateUserDto.prototype, "uploadedProfilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1234' }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.Length)(4, 4),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: create_user_beneficiary_info_dto_1.CreateUserBeneficiaryInfoDto, required: false }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_user_beneficiary_info_dto_1.CreateUserBeneficiaryInfoDto),
    (0, class_validator_1.ValidateIf)((o) => o.type === user_type_enum_1.UserTypeEnum.BENEFICIARIO),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", create_user_beneficiary_info_dto_1.CreateUserBeneficiaryInfoDto)
], CreateUserDto.prototype, "beneficiaryUserInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: create_user_professional_info_dto_1.CreateUserProfessionalInfoDto, required: false }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_user_professional_info_dto_1.CreateUserProfessionalInfoDto),
    (0, class_validator_1.ValidateIf)((o) => o.type === user_type_enum_1.UserTypeEnum.PROFISSIONAL),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", create_user_professional_info_dto_1.CreateUserProfessionalInfoDto)
], CreateUserDto.prototype, "professionalUserInfo", void 0);
//# sourceMappingURL=create-user.dto.js.map