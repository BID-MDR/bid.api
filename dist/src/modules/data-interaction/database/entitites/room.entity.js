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
exports.RoomEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const room_type_enum_1 = require("../enums/room-type.enum");
const room_solution_entity_1 = require("./room-solution.entity");
const work_request_entity_1 = require("./work-request.entity");
let RoomEntity = class RoomEntity extends base_entity_1.BaseEntity {
    name;
    type;
    roomSolutions;
    workRequest;
};
exports.RoomEntity = RoomEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 70,
    }),
    __metadata("design:type", String)
], RoomEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: room_type_enum_1.RoomTypeEnum,
    }),
    __metadata("design:type", String)
], RoomEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_solution_entity_1.RoomSolutionEntity, (roomSolution) => roomSolution.room, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], RoomEntity.prototype, "roomSolutions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => work_request_entity_1.WorkRequestEntity, (workRequest) => workRequest.room),
    __metadata("design:type", work_request_entity_1.WorkRequestEntity)
], RoomEntity.prototype, "workRequest", void 0);
exports.RoomEntity = RoomEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'room' })
], RoomEntity);
//# sourceMappingURL=room.entity.js.map