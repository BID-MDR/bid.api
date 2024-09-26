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
exports.MessageBackofficeEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const user_backoffice_entity_1 = require("./user-backoffice.entity");
let MessageBackofficeEntity = class MessageBackofficeEntity extends base_entity_1.BaseEntity {
    sender;
    receiver;
    content;
    sentAt;
    isRead;
    identifier;
};
exports.MessageBackofficeEntity = MessageBackofficeEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_backoffice_entity_1.UserBackofficeEntity, (user) => user.sentMessages, { eager: true }),
    __metadata("design:type", user_backoffice_entity_1.UserBackofficeEntity)
], MessageBackofficeEntity.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.receivedMessages, { eager: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], MessageBackofficeEntity.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    __metadata("design:type", String)
], MessageBackofficeEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MessageBackofficeEntity.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    }),
    __metadata("design:type", Boolean)
], MessageBackofficeEntity.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    __metadata("design:type", String)
], MessageBackofficeEntity.prototype, "identifier", void 0);
exports.MessageBackofficeEntity = MessageBackofficeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'messages_backoffice' })
], MessageBackofficeEntity);
//# sourceMappingURL=message-backoffice.entity.js.map