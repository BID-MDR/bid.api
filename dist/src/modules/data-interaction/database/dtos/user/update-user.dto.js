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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const user_type_enum_1 = require("../../enums/user-type.enum");
const update_address_dto_1 = require("../address/update-address.dto");
const create_user_dto_1 = require("./create-user.dto");
const create_user_appointment_dto_1 = require("./user-appointment/create-user-appointment.dto");
const update_user_appointment_dto_1 = require("./user-appointment/update-user-appointment.dto");
const update_user_beneficiary_info_dto_1 = require("./user-beneficiary-info/update-user-beneficiary-info.dto");
const update_user_professional_info_dto_1 = require("./user-professional-info/update-user-professional-info.dto");
class UpdateUserDto extends (0, swagger_1.OmitType)((0, swagger_1.PartialType)(create_user_dto_1.CreateUserDto), [
    'password',
    'beneficiaryUserInfo',
    'professionalUserInfo',
    'address',
    'cpf'
]) {
    newAppointments;
    updateAppointments;
    beneficiaryUserInfo;
    professionalUserInfo;
    address;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: create_user_appointment_dto_1.CreateUserAppointmentDto, isArray: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_user_appointment_dto_1.CreateUserAppointmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "newAppointments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: update_user_appointment_dto_1.UpdateUserAppointmentDto, isArray: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_user_appointment_dto_1.UpdateUserAppointmentDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "updateAppointments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: update_user_beneficiary_info_dto_1.UpdateUserBeneficiaryInfoDto, required: false }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_user_beneficiary_info_dto_1.UpdateUserBeneficiaryInfoDto),
    (0, class_validator_1.ValidateIf)((o) => o.type === user_type_enum_1.UserTypeEnum.BENEFICIARIO),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", update_user_beneficiary_info_dto_1.UpdateUserBeneficiaryInfoDto)
], UpdateUserDto.prototype, "beneficiaryUserInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: update_user_professional_info_dto_1.UpdateUserProfessionalInfoDto, required: false }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_user_professional_info_dto_1.UpdateUserProfessionalInfoDto),
    (0, class_validator_1.ValidateIf)((o) => o.type === user_type_enum_1.UserTypeEnum.PROFISSIONAL),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", update_user_professional_info_dto_1.UpdateUserProfessionalInfoDto)
], UpdateUserDto.prototype, "professionalUserInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: update_address_dto_1.UpdateAddressDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => update_address_dto_1.UpdateAddressDto),
    __metadata("design:type", update_address_dto_1.UpdateAddressDto)
], UpdateUserDto.prototype, "address", void 0);
//# sourceMappingURL=update-user.dto.js.map