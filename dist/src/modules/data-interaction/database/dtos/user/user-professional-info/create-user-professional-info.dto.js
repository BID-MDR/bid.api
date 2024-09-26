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
exports.CreateUserProfessionalInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const portifolio_type_enum_1 = require("../../../enums/portifolio-type.enum");
const create_address_dto_1 = require("../../address/create-address.dto");
const create_user_resting_day_dto_1 = require("../user-resting-day/create-user-resting-day.dto");
class CreateUserProfessionalInfoDto {
    portifolioType;
    portifolioLink;
    about;
    gradYear;
    gradMonth;
    confeaRegistrationNumber;
    cauRegistrationNumber;
    restingDays;
    worksFrom;
    worksTo;
    addresses;
}
exports.CreateUserProfessionalInfoDto = CreateUserProfessionalInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: portifolio_type_enum_1.PortifolioTypeEnum }),
    (0, class_validator_1.IsEnum)(portifolio_type_enum_1.PortifolioTypeEnum),
    __metadata("design:type", String)
], CreateUserProfessionalInfoDto.prototype, "portifolioType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://www.linkedin.com/in/username' }),
    (0, class_validator_1.IsUrl)({
        allow_fragments: true,
        require_protocol: true,
        allow_protocol_relative_urls: true,
        allow_query_components: true,
        allow_underscores: true,
    }),
    __metadata("design:type", String)
], CreateUserProfessionalInfoDto.prototype, "portifolioLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Maximo de 500 chars' }),
    (0, class_validator_1.Length)(1, 500),
    __metadata("design:type", String)
], CreateUserProfessionalInfoDto.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 1900, maximum: new Date().getFullYear() }),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(new Date().getFullYear() + 1),
    __metadata("design:type", Number)
], CreateUserProfessionalInfoDto.prototype, "gradYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateUserProfessionalInfoDto.prototype, "gradMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.ValidateIf)((o) => !o.cauRegistrationNumber),
    __metadata("design:type", String)
], CreateUserProfessionalInfoDto.prototype, "confeaRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.ValidateIf)((o) => !o.confeaRegistrationNumber),
    __metadata("design:type", String)
], CreateUserProfessionalInfoDto.prototype, "cauRegistrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: create_user_resting_day_dto_1.CreateUserRestingDayDto, isArray: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_user_resting_day_dto_1.CreateUserRestingDayDto),
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Array)
], CreateUserProfessionalInfoDto.prototype, "restingDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Horário militar', example: '08:00' }),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateUserProfessionalInfoDto.prototype, "worksFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Horário militar', example: '18:00' }),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateUserProfessionalInfoDto.prototype, "worksTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: create_address_dto_1.CreateAddressDto, isArray: true }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_address_dto_1.CreateAddressDto),
    __metadata("design:type", Array)
], CreateUserProfessionalInfoDto.prototype, "addresses", void 0);
//# sourceMappingURL=create-user-professional-info.dto.js.map