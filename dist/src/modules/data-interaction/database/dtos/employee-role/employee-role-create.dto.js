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
exports.CreateEmployeeRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const employee_role_enum_1 = require("../../enums/employee-role.enum");
class CreateEmployeeRoleDto {
    description;
    role;
    employeeId;
    active;
    employee;
}
exports.CreateEmployeeRoleDto = CreateEmployeeRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Length)(1, 70),
    __metadata("design:type", String)
], CreateEmployeeRoleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: employee_role_enum_1.EmployeeRoleEnum }),
    (0, class_validator_1.IsEnum)(employee_role_enum_1.EmployeeRoleEnum),
    __metadata("design:type", String)
], CreateEmployeeRoleDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEmployeeRoleDto.prototype, "employeeId", void 0);
//# sourceMappingURL=employee-role-create.dto.js.map