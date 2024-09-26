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
exports.ResponseEmployeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const base_response_dto_1 = require("../../../../../core/dtos/crud/base-response.dto");
const employee_status_enum_1 = require("../../enums/employee-status.enum");
const response_company_dto_1 = require("../company/response-company.dto");
const response_employee_role_dto_1 = require("../employee-role/response-employee-role.dto");
const reponse_user_dto_1 = require("../user/reponse-user.dto");
let ResponseEmployeeDto = class ResponseEmployeeDto extends base_response_dto_1.BaseResponseDto {
    company;
    user;
    status;
    roles;
};
exports.ResponseEmployeeDto = ResponseEmployeeDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_company_dto_1.ResponseCompanyDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", response_company_dto_1.ResponseCompanyDto)
], ResponseEmployeeDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: reponse_user_dto_1.UserResponseDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => reponse_user_dto_1.UserResponseDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", reponse_user_dto_1.UserResponseDto)
], ResponseEmployeeDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseEmployeeDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_employee_role_dto_1.ResponseEmployeeRoleDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? []),
    __metadata("design:type", Array)
], ResponseEmployeeDto.prototype, "roles", void 0);
exports.ResponseEmployeeDto = ResponseEmployeeDto = __decorate([
    (0, class_transformer_1.Exclude)()
], ResponseEmployeeDto);
//# sourceMappingURL=response-employee.dto.js.map