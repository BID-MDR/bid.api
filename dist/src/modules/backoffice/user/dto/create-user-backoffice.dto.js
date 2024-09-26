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
exports.CreateUserBackofficeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const userTypeEnum_1 = require("./userTypeEnum");
const userStatusEnum_1 = require("./userStatusEnum");
class CreateUserBackofficeDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
    name;
    type;
    email;
    password;
    lastAccess;
    timeView;
    status;
    rolesId;
    roles;
}
exports.CreateUserBackofficeDto = CreateUserBackofficeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserBackofficeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: userTypeEnum_1.UserBackofficeTypeEnum }),
    (0, class_validator_1.IsEnum)(userTypeEnum_1.UserBackofficeTypeEnum),
    __metadata("design:type", String)
], CreateUserBackofficeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'test@email.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserBackofficeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserBackofficeDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: new Date() }),
    __metadata("design:type", Date)
], CreateUserBackofficeDto.prototype, "lastAccess", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserBackofficeDto.prototype, "timeView", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: userStatusEnum_1.UserStatusEnum }),
    (0, class_validator_1.IsEnum)(userStatusEnum_1.UserStatusEnum),
    __metadata("design:type", String)
], CreateUserBackofficeDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], CreateUserBackofficeDto.prototype, "rolesId", void 0);
//# sourceMappingURL=create-user-backoffice.dto.js.map