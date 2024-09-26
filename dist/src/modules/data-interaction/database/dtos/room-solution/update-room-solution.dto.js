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
exports.UpdateRoomSolutionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_room_solution_dto_1 = require("./create-room-solution.dto");
const class_validator_1 = require("class-validator");
class UpdateRoomSolutionDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_room_solution_dto_1.CreateRoomSolutionDto, ['solution'])) {
    id;
}
exports.UpdateRoomSolutionDto = UpdateRoomSolutionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateRoomSolutionDto.prototype, "id", void 0);
//# sourceMappingURL=update-room-solution.dto.js.map