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
exports.CreateUserGeneratedMediaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const media_type_enum_1 = require("../../../enums/media-type.enum");
class CreateUserGeneratedMediaDto {
    url;
    type;
    mimeType;
}
exports.CreateUserGeneratedMediaDto = CreateUserGeneratedMediaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYGBgYGBgYGBgYGBgYGBgYGBgYHSggGBolHRgXITEhJSkrLi4uGB8zODMsNygtLisB',
    }),
    (0, class_validator_1.IsDataURI)(),
    __metadata("design:type", String)
], CreateUserGeneratedMediaDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: media_type_enum_1.MediaTypeEnum }),
    (0, class_validator_1.IsEnum)(media_type_enum_1.MediaTypeEnum),
    __metadata("design:type", String)
], CreateUserGeneratedMediaDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image/jpeg' }),
    (0, class_validator_1.IsMimeType)(),
    __metadata("design:type", String)
], CreateUserGeneratedMediaDto.prototype, "mimeType", void 0);
//# sourceMappingURL=create-user-generated-media.dto.js.map