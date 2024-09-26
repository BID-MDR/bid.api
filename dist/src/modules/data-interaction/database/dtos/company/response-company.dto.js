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
exports.ResponseCompanyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const base_response_dto_1 = require("../../../../../core/dtos/crud/base-response.dto");
const response_address_dto_1 = require("../address/response-address.dto");
const response_demand_dto_1 = require("../demand/response-demand.dto");
const response_employee_dto_1 = require("../employee/response-employee.dto");
const reponse_user_dto_1 = require("../user/reponse-user.dto");
let ResponseCompanyDto = class ResponseCompanyDto extends base_response_dto_1.BaseResponseDto {
    name;
    cnpj;
    status;
    addresses;
    userAdmin;
    employees;
    demands;
};
exports.ResponseCompanyDto = ResponseCompanyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseCompanyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseCompanyDto.prototype, "cnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseCompanyDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: response_address_dto_1.AddressResponseDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_address_dto_1.AddressResponseDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", response_address_dto_1.AddressResponseDto)
], ResponseCompanyDto.prototype, "addresses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: reponse_user_dto_1.UserResponseDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => reponse_user_dto_1.UserResponseDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", reponse_user_dto_1.UserResponseDto)
], ResponseCompanyDto.prototype, "userAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: response_employee_dto_1.ResponseEmployeeDto, isArray: true }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_employee_dto_1.ResponseEmployeeDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? []),
    __metadata("design:type", Array)
], ResponseCompanyDto.prototype, "employees", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_demand_dto_1.ResponseDemandDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? []),
    __metadata("design:type", Array)
], ResponseCompanyDto.prototype, "demands", void 0);
exports.ResponseCompanyDto = ResponseCompanyDto = __decorate([
    (0, class_transformer_1.Exclude)()
], ResponseCompanyDto);
//# sourceMappingURL=response-company.dto.js.map