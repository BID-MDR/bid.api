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
exports.UpdateAddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_address_dto_1 = require("./create-address.dto");
const class_validator_1 = require("class-validator");
const brazilian_class_validator_1 = require("brazilian-class-validator");
class UpdateAddressDto extends (0, swagger_1.PartialType)(create_address_dto_1.CreateAddressDto) {
    id;
    state;
    nickname;
    city;
    zipcode;
    complement;
    neighborhood;
    number;
    street;
    latitude;
    longitude;
    maximumDistanceToWorks;
}
exports.UpdateAddressDto = UpdateAddressDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SP' }),
    (0, class_validator_1.Length)(2, 2),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.Length)(1, 100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '00000-000' }),
    (0, brazilian_class_validator_1.IsCEP)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "zipcode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(1, 50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "complement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(1, 10),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '-23.000000' }),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '-46.000000' }),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", String)
], UpdateAddressDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAddressDto.prototype, "maximumDistanceToWorks", void 0);
//# sourceMappingURL=update-address.dto.js.map