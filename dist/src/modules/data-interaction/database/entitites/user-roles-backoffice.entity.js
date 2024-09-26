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
exports.UserRolesBackofficeEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../core/entities/base.entity");
const functionTypeEnum_1 = require("../../../backoffice/user/dto/functionTypeEnum");
const user_backoffice_entity_1 = require("./user-backoffice.entity");
let UserRolesBackofficeEntity = class UserRolesBackofficeEntity extends base_entity_1.BaseEntity {
    role;
    description;
    active;
    user;
};
exports.UserRolesBackofficeEntity = UserRolesBackofficeEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: functionTypeEnum_1.FunctionTypeEnum,
    }),
    __metadata("design:type", String)
], UserRolesBackofficeEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        default: "Sem descrição",
    }),
    __metadata("design:type", String)
], UserRolesBackofficeEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
    }),
    __metadata("design:type", Boolean)
], UserRolesBackofficeEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_backoffice_entity_1.UserBackofficeEntity, user => user.roles),
    __metadata("design:type", user_backoffice_entity_1.UserBackofficeEntity)
], UserRolesBackofficeEntity.prototype, "user", void 0);
exports.UserRolesBackofficeEntity = UserRolesBackofficeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "user_roles_backoffice" })
], UserRolesBackofficeEntity);
//# sourceMappingURL=user-roles-backoffice.entity.js.map