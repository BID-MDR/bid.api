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
exports.UserRestingDayEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_professional_info_entity_1 = require("./user-professional-info.entity");
const resting_day_enum_1 = require("../enums/resting-day.enum");
let UserRestingDayEntity = class UserRestingDayEntity extends base_entity_1.BaseEntity {
    day;
    userProfessionalInfo;
};
exports.UserRestingDayEntity = UserRestingDayEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: resting_day_enum_1.RestingDayEnum,
    }),
    __metadata("design:type", String)
], UserRestingDayEntity.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_professional_info_entity_1.UserProfessionalInfoEntity, (userProfessionalInfo) => userProfessionalInfo.restingDays),
    __metadata("design:type", user_professional_info_entity_1.UserProfessionalInfoEntity)
], UserRestingDayEntity.prototype, "userProfessionalInfo", void 0);
exports.UserRestingDayEntity = UserRestingDayEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'user-resting-day' })
], UserRestingDayEntity);
//# sourceMappingURL=user-resting-day.entity.js.map