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
exports.ProfessionalCouncilRegistrationRequestDto = void 0;
const brazilian_class_validator_1 = require("brazilian-class-validator");
class ProfessionalCouncilRegistrationRequestDto {
    cpf;
}
exports.ProfessionalCouncilRegistrationRequestDto = ProfessionalCouncilRegistrationRequestDto;
__decorate([
    (0, brazilian_class_validator_1.IsCPF)(),
    __metadata("design:type", String)
], ProfessionalCouncilRegistrationRequestDto.prototype, "cpf", void 0);
//# sourceMappingURL=professional-council-resgistration-request.dto.js.map