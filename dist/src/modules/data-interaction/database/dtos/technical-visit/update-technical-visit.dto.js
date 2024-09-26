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
exports.UpdateTechnicalVisitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_technical_visit_dto_1 = require("./create-technical-visit.dto");
const class_validator_1 = require("class-validator");
const technical_visit_status_enum_1 = require("../../enums/technical-visit-status.enum");
class UpdateTechnicalVisitDto extends (0, swagger_1.PickType)((0, swagger_1.PartialType)(create_technical_visit_dto_1.CreateTechnicalVisitDto), ['to', 'from']) {
    cancelReason;
    status;
}
exports.UpdateTechnicalVisitDto = UpdateTechnicalVisitDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(3, 200),
    __metadata("design:type", String)
], UpdateTechnicalVisitDto.prototype, "cancelReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(technical_visit_status_enum_1.TechnicalVisitStatusEnum),
    __metadata("design:type", String)
], UpdateTechnicalVisitDto.prototype, "status", void 0);
//# sourceMappingURL=update-technical-visit.dto.js.map