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
exports.GovbrSsoInfoToRegisterEntity = void 0;
const typeorm_1 = require("typeorm");
const govbr_sso_entity_1 = require("./govbr-sso.entity");
const base_entity_1 = require("../../../../core/entities/base.entity");
let GovbrSsoInfoToRegisterEntity = class GovbrSsoInfoToRegisterEntity extends base_entity_1.BaseEntity {
    name;
    cpf;
    email;
    phone;
    govbrSso;
    constructor(name, cpf, email, phone) {
        super();
        this.name = name;
        this.cpf = cpf;
        this.email = email;
        this.phone = phone;
    }
};
exports.GovbrSsoInfoToRegisterEntity = GovbrSsoInfoToRegisterEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
    }),
    __metadata("design:type", String)
], GovbrSsoInfoToRegisterEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 15,
    }),
    __metadata("design:type", String)
], GovbrSsoInfoToRegisterEntity.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], GovbrSsoInfoToRegisterEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 15,
        nullable: true,
    }),
    __metadata("design:type", String)
], GovbrSsoInfoToRegisterEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => govbr_sso_entity_1.GovbrSsoEntity, (govbrsso) => govbrsso.infoToRegister),
    __metadata("design:type", govbr_sso_entity_1.GovbrSsoEntity)
], GovbrSsoInfoToRegisterEntity.prototype, "govbrSso", void 0);
exports.GovbrSsoInfoToRegisterEntity = GovbrSsoInfoToRegisterEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'govbrsso-info-to-register' }),
    __metadata("design:paramtypes", [String, String, String, String])
], GovbrSsoInfoToRegisterEntity);
//# sourceMappingURL=govbr-sso-info-to-register.entity.js.map