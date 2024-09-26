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
exports.UserOtpRequestEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const user_otp_enum_1 = require("../enums/user-otp.enum");
let UserOtpRequestEntity = class UserOtpRequestEntity extends base_entity_1.BaseEntity {
    token;
    status;
    user;
};
exports.UserOtpRequestEntity = UserOtpRequestEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
    }),
    __metadata("design:type", String)
], UserOtpRequestEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_otp_enum_1.UserOtpStatusEnum,
        default: user_otp_enum_1.UserOtpStatusEnum.PENDING,
    }),
    __metadata("design:type", String)
], UserOtpRequestEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.otpRequest),
    __metadata("design:type", user_entity_1.UserEntity)
], UserOtpRequestEntity.prototype, "user", void 0);
exports.UserOtpRequestEntity = UserOtpRequestEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'user-otp-request' })
], UserOtpRequestEntity);
//# sourceMappingURL=user-otp-request.entity.js.map