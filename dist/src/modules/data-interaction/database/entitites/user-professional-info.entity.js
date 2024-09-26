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
exports.UserProfessionalInfoEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const portifolio_type_enum_1 = require("../enums/portifolio-type.enum");
const user_entity_1 = require("./user.entity");
const user_resting_day_entity_1 = require("./user-resting-day.entity");
const address_entity_1 = require("./address.entity");
let UserProfessionalInfoEntity = class UserProfessionalInfoEntity extends base_entity_1.BaseEntity {
    portifolioType;
    about;
    portifolioLink;
    gradYear;
    gradMonth;
    confeaRegistrationNumber;
    cauRegistrationNumber;
    laborAvailability;
    materialPurchaseAndDeliveryAvailability;
    restingDays;
    worksFrom;
    worksTo;
    user;
    addresses;
};
exports.UserProfessionalInfoEntity = UserProfessionalInfoEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: portifolio_type_enum_1.PortifolioTypeEnum,
        default: portifolio_type_enum_1.PortifolioTypeEnum.WEBSITE,
    }),
    __metadata("design:type", String)
], UserProfessionalInfoEntity.prototype, "portifolioType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
    }),
    __metadata("design:type", String)
], UserProfessionalInfoEntity.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
    }),
    __metadata("design:type", String)
], UserProfessionalInfoEntity.prototype, "portifolioLink", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], UserProfessionalInfoEntity.prototype, "gradYear", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], UserProfessionalInfoEntity.prototype, "gradMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfessionalInfoEntity.prototype, "confeaRegistrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfessionalInfoEntity.prototype, "cauRegistrationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    __metadata("design:type", Boolean)
], UserProfessionalInfoEntity.prototype, "laborAvailability", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], UserProfessionalInfoEntity.prototype, "materialPurchaseAndDeliveryAvailability", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_resting_day_entity_1.UserRestingDayEntity, (restingDay) => restingDay.userProfessionalInfo, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], UserProfessionalInfoEntity.prototype, "restingDays", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 5,
    }),
    __metadata("design:type", String)
], UserProfessionalInfoEntity.prototype, "worksFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 5,
    }),
    __metadata("design:type", String)
], UserProfessionalInfoEntity.prototype, "worksTo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.professionalUserInfo),
    __metadata("design:type", user_entity_1.UserEntity)
], UserProfessionalInfoEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.AddressEntity, (address) => address.userProfessionalInfo, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], UserProfessionalInfoEntity.prototype, "addresses", void 0);
exports.UserProfessionalInfoEntity = UserProfessionalInfoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'user-professional-info' })
], UserProfessionalInfoEntity);
//# sourceMappingURL=user-professional-info.entity.js.map