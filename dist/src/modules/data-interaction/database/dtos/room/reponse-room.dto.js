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
exports.RoomResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const response_room_solution_dto_1 = require("../room-solution/response-room-solution.dto");
let RoomResponseDto = class RoomResponseDto {
    id;
    name;
    type;
    roomSolutions;
};
exports.RoomResponseDto = RoomResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], RoomResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => response_room_solution_dto_1.ResponseRoomSolutionDto, isArray: true }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => response_room_solution_dto_1.ResponseRoomSolutionDto),
    __metadata("design:type", Array)
], RoomResponseDto.prototype, "roomSolutions", void 0);
exports.RoomResponseDto = RoomResponseDto = __decorate([
    (0, class_transformer_1.Exclude)()
], RoomResponseDto);
//# sourceMappingURL=reponse-room.dto.js.map