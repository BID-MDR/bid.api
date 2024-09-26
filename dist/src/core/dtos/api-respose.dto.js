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
exports.ApiResponseDto = exports.ErrorApiResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ErrorApiResponseDto {
    statusCode;
    message;
    code;
    timestamp;
    path;
    method;
    constructor(statusCode, message, code, timestamp, path, method) {
        this.statusCode = statusCode;
        this.message = message;
        this.code = code;
        this.timestamp = timestamp;
        this.path = path;
        this.method = method;
    }
}
exports.ErrorApiResponseDto = ErrorApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ErrorApiResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ErrorApiResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ErrorApiResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ErrorApiResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ErrorApiResponseDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ErrorApiResponseDto.prototype, "method", void 0);
class ApiResponseDto {
    success;
    errors = null;
    data;
    constructor(success = true, data, errors = null) {
        this.success = success;
        this.errors = errors;
        this.data = data;
    }
}
exports.ApiResponseDto = ApiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    __metadata("design:type", Boolean)
], ApiResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: ErrorApiResponseDto, nullable: true }),
    __metadata("design:type", Array)
], ApiResponseDto.prototype, "errors", void 0);
//# sourceMappingURL=api-respose.dto.js.map