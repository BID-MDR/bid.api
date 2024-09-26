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
exports.ResponseWorkRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const base_response_dto_1 = require("../../../../../core/dtos/crud/base-response.dto");
const reponse_room_dto_1 = require("../room/reponse-room.dto");
let ResponseWelfare = class ResponseWelfare {
    welfareProgram;
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseWelfare.prototype, "welfareProgram", void 0);
ResponseWelfare = __decorate([
    (0, class_transformer_1.Exclude)()
], ResponseWelfare);
let ResponseWorkRequestDto = class ResponseWorkRequestDto extends base_response_dto_1.BaseResponseDto {
    description;
    resident;
    responsiblePersonName;
    kinship;
    propertyType;
    flooring;
    prevailingConstructionMaterials;
    status;
    room;
    welfare;
};
exports.ResponseWorkRequestDto = ResponseWorkRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseWorkRequestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ResponseWorkRequestDto.prototype, "resident", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseWorkRequestDto.prototype, "responsiblePersonName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseWorkRequestDto.prototype, "kinship", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseWorkRequestDto.prototype, "propertyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseWorkRequestDto.prototype, "flooring", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseWorkRequestDto.prototype, "prevailingConstructionMaterials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseWorkRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: reponse_room_dto_1.RoomResponseDto, isArray: true }),
    (0, class_transformer_1.Type)(() => reponse_room_dto_1.RoomResponseDto),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ResponseWorkRequestDto.prototype, "room", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ResponseWelfare, isArray: true }),
    (0, class_transformer_1.Type)(() => ResponseWelfare),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ResponseWorkRequestDto.prototype, "welfare", void 0);
exports.ResponseWorkRequestDto = ResponseWorkRequestDto = __decorate([
    (0, class_transformer_1.Exclude)()
], ResponseWorkRequestDto);
//# sourceMappingURL=response-work-request.dto.js.map