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
exports.AddressEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_professional_info_entity_1 = require("./user-professional-info.entity");
const user_entity_1 = require("./user.entity");
const company_entity_1 = require("./company.entity");
let AddressEntity = class AddressEntity extends base_entity_1.BaseEntity {
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
    user;
    userProfessionalInfo;
    company;
};
exports.AddressEntity = AddressEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 2,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 11,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "zipcode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "complement", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
    }),
    __metadata("design:type", String)
], AddressEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'smallint',
        unsigned: true,
        nullable: true,
    }),
    __metadata("design:type", Number)
], AddressEntity.prototype, "maximumDistanceToWorks", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.address),
    __metadata("design:type", user_entity_1.UserEntity)
], AddressEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_professional_info_entity_1.UserProfessionalInfoEntity, (userProfessionalInfoEntity) => userProfessionalInfoEntity.addresses),
    __metadata("design:type", user_professional_info_entity_1.UserProfessionalInfoEntity)
], AddressEntity.prototype, "userProfessionalInfo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => company_entity_1.CompanyEntity, (company) => company.addresses),
    __metadata("design:type", company_entity_1.CompanyEntity)
], AddressEntity.prototype, "company", void 0);
exports.AddressEntity = AddressEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'address' })
], AddressEntity);
//# sourceMappingURL=address.entity.js.map