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
exports.HelpEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const helpStatus_enum_1 = require("../dtos/help/helpStatus.enum");
let HelpEntity = class HelpEntity extends base_entity_1.BaseEntity {
    user;
    content;
    sentAt;
    status;
};
exports.HelpEntity = HelpEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.helpRequests, { eager: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], HelpEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    __metadata("design:type", String)
], HelpEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HelpEntity.prototype, "sentAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: helpStatus_enum_1.HelpStatusEnum,
        default: helpStatus_enum_1.HelpStatusEnum.PENDING
    }),
    __metadata("design:type", String)
], HelpEntity.prototype, "status", void 0);
exports.HelpEntity = HelpEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'help' })
], HelpEntity);
//# sourceMappingURL=help.entity.js.map