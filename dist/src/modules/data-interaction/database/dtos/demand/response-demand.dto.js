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
exports.ResponseDemandDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const base_response_dto_1 = require("../../../../../core/dtos/crud/base-response.dto");
const response_company_dto_1 = require("../company/response-company.dto");
const response_constructions_dto_1 = require("../constructions/response-constructions.dto");
const reponse_technical_visit_dto_1 = require("../technical-visit/reponse-technical-visit.dto");
const reponse_user_dto_1 = require("../user/reponse-user.dto");
const response_work_request_dto_1 = require("../work-request/response-work-request.dto");
let ResponseDemandDto = class ResponseDemandDto extends base_response_dto_1.BaseResponseDto {
    document;
    state;
    city;
    zipcode;
    complement;
    neighborhood;
    number;
    street;
    latitude;
    longitude;
    status;
    beneficiary;
    company;
    workRequest;
    technicalVisit;
    construction;
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
};
exports.ResponseDemandDto = ResponseDemandDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "zipcode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "complement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseDemandDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => reponse_user_dto_1.UserResponseDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => reponse_user_dto_1.UserResponseDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", reponse_user_dto_1.UserResponseDto)
], ResponseDemandDto.prototype, "beneficiary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => response_company_dto_1.ResponseCompanyDto, nullable: false }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_company_dto_1.ResponseCompanyDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", response_company_dto_1.ResponseCompanyDto)
], ResponseDemandDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => response_work_request_dto_1.ResponseWorkRequestDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_work_request_dto_1.ResponseWorkRequestDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", response_work_request_dto_1.ResponseWorkRequestDto)
], ResponseDemandDto.prototype, "workRequest", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => reponse_technical_visit_dto_1.TechnicalVisitResponseDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => reponse_technical_visit_dto_1.TechnicalVisitResponseDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", reponse_technical_visit_dto_1.TechnicalVisitResponseDto)
], ResponseDemandDto.prototype, "technicalVisit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => response_constructions_dto_1.ResponseConstructionsDto }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_constructions_dto_1.ResponseConstructionsDto),
    (0, class_transformer_1.Transform)(({ value }) => value ?? undefined),
    __metadata("design:type", response_constructions_dto_1.ResponseConstructionsDto)
], ResponseDemandDto.prototype, "construction", void 0);
exports.ResponseDemandDto = ResponseDemandDto = __decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:paramtypes", [Object])
], ResponseDemandDto);
//# sourceMappingURL=response-demand.dto.js.map