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
exports.TechnicalVisitResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const technical_visit_status_enum_1 = require("../../enums/technical-visit-status.enum");
let UserEntityDto = class UserEntityDto {
    id;
    name;
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], UserEntityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], UserEntityDto.prototype, "name", void 0);
UserEntityDto = __decorate([
    (0, class_transformer_1.Exclude)()
], UserEntityDto);
class TechnicalVisitResponseDto {
    from;
    to;
    cancelReason;
    cancelledBy;
    rescheduledBy;
    professional;
    beneficiary;
    status;
}
exports.TechnicalVisitResponseDto = TechnicalVisitResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TechnicalVisitResponseDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TechnicalVisitResponseDto.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TechnicalVisitResponseDto.prototype, "cancelReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserEntityDto }),
    __metadata("design:type", UserEntityDto)
], TechnicalVisitResponseDto.prototype, "cancelledBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserEntityDto }),
    __metadata("design:type", UserEntityDto)
], TechnicalVisitResponseDto.prototype, "rescheduledBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserEntityDto }),
    __metadata("design:type", UserEntityDto)
], TechnicalVisitResponseDto.prototype, "professional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserEntityDto }),
    __metadata("design:type", UserEntityDto)
], TechnicalVisitResponseDto.prototype, "beneficiary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: technical_visit_status_enum_1.TechnicalVisitStatusEnum }),
    __metadata("design:type", String)
], TechnicalVisitResponseDto.prototype, "status", void 0);
//# sourceMappingURL=reponse-technical-visit.dto.js.map