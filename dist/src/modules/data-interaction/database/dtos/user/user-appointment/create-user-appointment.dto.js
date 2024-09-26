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
exports.CreateUserAppointmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_appointment_type_enum_1 = require("../../../enums/user-appointment-type.enum");
class CreateUserAppointmentDto {
    from;
    to;
    type;
}
exports.CreateUserAppointmentDto = CreateUserAppointmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: new Date().toISOString() }),
    (0, class_validator_1.IsISO8601)({ strict: true }),
    __metadata("design:type", Date)
], CreateUserAppointmentDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: new Date().toISOString() }),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", Date)
], CreateUserAppointmentDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_appointment_type_enum_1.UserAppointmentTypeEnum }),
    (0, class_validator_1.IsEnum)(user_appointment_type_enum_1.UserAppointmentTypeEnum),
    __metadata("design:type", String)
], CreateUserAppointmentDto.prototype, "type", void 0);
//# sourceMappingURL=create-user-appointment.dto.js.map