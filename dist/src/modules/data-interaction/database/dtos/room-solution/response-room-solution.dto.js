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
exports.ResponseRoomSolutionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const response_user_generated_media_dto_1 = require("../user/user-generated-media/response-user-generated-media.dto");
let ResponseRoomSolutionDto = class ResponseRoomSolutionDto {
    id;
    solution;
    picturesAndVideos;
};
exports.ResponseRoomSolutionDto = ResponseRoomSolutionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseRoomSolutionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], ResponseRoomSolutionDto.prototype, "solution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => response_user_generated_media_dto_1.ResponseUserGeneratedMediaDto, isArray: true }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_user_generated_media_dto_1.ResponseUserGeneratedMediaDto),
    __metadata("design:type", Array)
], ResponseRoomSolutionDto.prototype, "picturesAndVideos", void 0);
exports.ResponseRoomSolutionDto = ResponseRoomSolutionDto = __decorate([
    (0, class_transformer_1.Exclude)()
], ResponseRoomSolutionDto);
//# sourceMappingURL=response-room-solution.dto.js.map