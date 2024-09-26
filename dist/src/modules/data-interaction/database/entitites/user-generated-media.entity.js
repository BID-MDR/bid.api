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
exports.UserGeneratedMediaEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const media_type_enum_1 = require("../enums/media-type.enum");
const room_solution_entity_1 = require("./room-solution.entity");
let UserGeneratedMediaEntity = class UserGeneratedMediaEntity extends base_entity_1.BaseEntity {
    url;
    type;
    roomSolution;
};
exports.UserGeneratedMediaEntity = UserGeneratedMediaEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
    }),
    __metadata("design:type", String)
], UserGeneratedMediaEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: media_type_enum_1.MediaTypeEnum,
    }),
    __metadata("design:type", String)
], UserGeneratedMediaEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_solution_entity_1.RoomSolutionEntity, (roomSolution) => roomSolution.picturesAndVideos),
    __metadata("design:type", room_solution_entity_1.RoomSolutionEntity)
], UserGeneratedMediaEntity.prototype, "roomSolution", void 0);
exports.UserGeneratedMediaEntity = UserGeneratedMediaEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'user-generated-media' })
], UserGeneratedMediaEntity);
//# sourceMappingURL=user-generated-media.entity.js.map