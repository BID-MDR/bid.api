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
exports.CreateRoomSolutionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const room_entity_1 = require("../../entitites/room.entity");
const room_solution_enum_1 = require("../../enums/room-solution.enum");
class CreateRoomSolutionDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
    roomId;
    room;
    solution;
}
exports.CreateRoomSolutionDto = CreateRoomSolutionDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRoomSolutionDto.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", room_entity_1.RoomEntity)
], CreateRoomSolutionDto.prototype, "room", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: room_solution_enum_1.RoomSolutionEnum }),
    (0, class_validator_1.IsEnum)(room_solution_enum_1.RoomSolutionEnum),
    __metadata("design:type", String)
], CreateRoomSolutionDto.prototype, "solution", void 0);
//# sourceMappingURL=create-room-solution.dto.js.map