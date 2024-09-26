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
exports.GovbrSsoEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const govbr_sso_info_to_register_entity_1 = require("./govbr-sso-info-to-register.entity");
let GovbrSsoEntity = class GovbrSsoEntity extends base_entity_1.BaseEntity {
    codeVerifier;
    codeChallenge;
    token;
    registered;
    infoToRegister;
};
exports.GovbrSsoEntity = GovbrSsoEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
    }),
    __metadata("design:type", String)
], GovbrSsoEntity.prototype, "codeVerifier", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
    }),
    __metadata("design:type", String)
], GovbrSsoEntity.prototype, "codeChallenge", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 2000,
        nullable: true,
    }),
    __metadata("design:type", String)
], GovbrSsoEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], GovbrSsoEntity.prototype, "registered", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => govbr_sso_info_to_register_entity_1.GovbrSsoInfoToRegisterEntity, (infoToRegister) => infoToRegister.govbrSso, {
        cascade: true,
        onDelete: 'CASCADE',
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", govbr_sso_info_to_register_entity_1.GovbrSsoInfoToRegisterEntity)
], GovbrSsoEntity.prototype, "infoToRegister", void 0);
exports.GovbrSsoEntity = GovbrSsoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'govbr-sso' })
], GovbrSsoEntity);
//# sourceMappingURL=govbr-sso.entity.js.map