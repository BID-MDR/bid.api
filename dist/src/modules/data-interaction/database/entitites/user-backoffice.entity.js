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
exports.UserBackofficeEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const userTypeEnum_1 = require("../../../backoffice/user/dto/userTypeEnum");
const user_roles_backoffice_entity_1 = require("./user-roles-backoffice.entity");
const userStatusEnum_1 = require("../../../backoffice/user/dto/userStatusEnum");
const message_backoffice_entity_1 = require("./message-backoffice.entity");
let UserBackofficeEntity = class UserBackofficeEntity extends base_entity_1.BaseEntity {
    type;
    name;
    email;
    password;
    lastAccess;
    timeView;
    status;
    sentMessages;
    receivedMessages;
    roles;
};
exports.UserBackofficeEntity = UserBackofficeEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: userTypeEnum_1.UserBackofficeTypeEnum,
        default: userTypeEnum_1.UserBackofficeTypeEnum.BACKOFFICE,
    }),
    __metadata("design:type", String)
], UserBackofficeEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
    }),
    __metadata("design:type", String)
], UserBackofficeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
    }),
    __metadata("design:type", String)
], UserBackofficeEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        nullable: true
    }),
    __metadata("design:type", String)
], UserBackofficeEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "datetime",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UserBackofficeEntity.prototype, "lastAccess", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserBackofficeEntity.prototype, "timeView", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: userStatusEnum_1.UserStatusEnum,
        default: userStatusEnum_1.UserStatusEnum.ACTIVE,
    }),
    __metadata("design:type", String)
], UserBackofficeEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_backoffice_entity_1.MessageBackofficeEntity, message => message.sender),
    __metadata("design:type", Array)
], UserBackofficeEntity.prototype, "sentMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => message_backoffice_entity_1.MessageBackofficeEntity, message => message.receiver),
    __metadata("design:type", Array)
], UserBackofficeEntity.prototype, "receivedMessages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_roles_backoffice_entity_1.UserRolesBackofficeEntity, roles => roles.user, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], UserBackofficeEntity.prototype, "roles", void 0);
exports.UserBackofficeEntity = UserBackofficeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "user_backoffice" })
], UserBackofficeEntity);
//# sourceMappingURL=user-backoffice.entity.js.map