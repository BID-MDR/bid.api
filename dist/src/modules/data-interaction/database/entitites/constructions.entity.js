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
exports.ConstructionsEntity = void 0;
const typeorm_1 = require("typeorm");
const demand_entity_1 = require("./demand.entity");
const base_entity_1 = require("../../../../core/entities/base.entity");
const constructions_type_status_1 = require("../enums/constructions-type.status");
const constructions_stauts_enum_1 = require("../enums/constructions-stauts.enum");
let ConstructionsEntity = class ConstructionsEntity extends base_entity_1.BaseEntity {
    demand;
    type;
    description;
    area;
    status;
};
exports.ConstructionsEntity = ConstructionsEntity;
__decorate([
    (0, typeorm_1.OneToOne)(() => demand_entity_1.DemandEntity, demand => demand.construction),
    __metadata("design:type", demand_entity_1.DemandEntity)
], ConstructionsEntity.prototype, "demand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: constructions_type_status_1.ConstructionsTypeEnum,
        default: constructions_type_status_1.ConstructionsTypeEnum.REGULARIZABLE_AREA,
    }),
    __metadata("design:type", String)
], ConstructionsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], ConstructionsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], ConstructionsEntity.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: constructions_stauts_enum_1.ConstructionsStatusEnum,
        default: constructions_stauts_enum_1.ConstructionsStatusEnum.EM_ANDAMENTO,
    }),
    __metadata("design:type", String)
], ConstructionsEntity.prototype, "status", void 0);
exports.ConstructionsEntity = ConstructionsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "constructions" })
], ConstructionsEntity);
//# sourceMappingURL=constructions.entity.js.map