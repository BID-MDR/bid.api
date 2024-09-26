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
exports.UserAppointmentEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const user_appointment_type_enum_1 = require("../enums/user-appointment-type.enum");
let UserAppointmentEntity = class UserAppointmentEntity extends base_entity_1.BaseEntity {
    from;
    to;
    type;
    user;
};
exports.UserAppointmentEntity = UserAppointmentEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
    }),
    __metadata("design:type", Date)
], UserAppointmentEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
    }),
    __metadata("design:type", Date)
], UserAppointmentEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_appointment_type_enum_1.UserAppointmentTypeEnum,
    }),
    __metadata("design:type", String)
], UserAppointmentEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.appointments),
    __metadata("design:type", user_entity_1.UserEntity)
], UserAppointmentEntity.prototype, "user", void 0);
exports.UserAppointmentEntity = UserAppointmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'user-appointment' })
], UserAppointmentEntity);
//# sourceMappingURL=user-appointment.entity.js.map