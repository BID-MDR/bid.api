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
exports.SigninResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class InfoToRegisterDto {
    name;
    cpf;
    email;
    phone;
}
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", String)
], InfoToRegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", String)
], InfoToRegisterDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", String)
], InfoToRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", String)
], InfoToRegisterDto.prototype, "phone", void 0);
class SigninResponseDto {
    accessToken;
    registered;
    infoToRegister;
    constructor(accessToken, registered, infoToRegister) {
        this.accessToken = accessToken;
        this.registered = registered;
        this.infoToRegister = infoToRegister;
    }
}
exports.SigninResponseDto = SigninResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token de autenticação.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        nullable: false,
    }),
    __metadata("design:type", String)
], SigninResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({}),
    __metadata("design:type", Boolean)
], SigninResponseDto.prototype, "registered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: InfoToRegisterDto, nullable: true }),
    __metadata("design:type", InfoToRegisterDto)
], SigninResponseDto.prototype, "infoToRegister", void 0);
//# sourceMappingURL=signin-response.dto.js.map