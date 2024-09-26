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
exports.WorkRequestEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../core/entities/base.entity");
const flooring_enum_1 = require("../enums/flooring.enum");
const kinship_enum_1 = require("../enums/kinship.enum");
const prevailing_construction_materials_enum_1 = require("../enums/prevailing-construction-materials.enum");
const property_type_enum_1 = require("../enums/property-type.enum");
const demand_entity_1 = require("./demand.entity");
const room_entity_1 = require("./room.entity");
const work_request_welfare_entity_1 = require("./work-request-welfare.entity");
const technical_visit_status_enum_1 = require("../enums/technical-visit-status.enum");
const satisfaction_research_entity_1 = require("./satisfaction-research.entity");
let WorkRequestEntity = class WorkRequestEntity extends base_entity_1.BaseEntity {
    demand;
    description;
    resident;
    responsiblePersonName;
    kinship;
    propertyType;
    flooring;
    prevailingConstructionMaterials;
    room;
    welfare;
    status;
    satisfaction;
};
exports.WorkRequestEntity = WorkRequestEntity;
__decorate([
    (0, typeorm_1.OneToOne)(() => demand_entity_1.DemandEntity, demand => demand.workRequest),
    __metadata("design:type", demand_entity_1.DemandEntity)
], WorkRequestEntity.prototype, "demand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        default: "",
    }),
    __metadata("design:type", String)
], WorkRequestEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "tinyint",
    }),
    __metadata("design:type", Number)
], WorkRequestEntity.prototype, "resident", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        default: "",
    }),
    __metadata("design:type", String)
], WorkRequestEntity.prototype, "responsiblePersonName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: kinship_enum_1.KinshipEnum,
        type: "enum",
        default: kinship_enum_1.KinshipEnum.Me,
    }),
    __metadata("design:type", String)
], WorkRequestEntity.prototype, "kinship", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: property_type_enum_1.PropertyTypeEnum,
        type: "enum",
        default: property_type_enum_1.PropertyTypeEnum.CASA,
    }),
    __metadata("design:type", String)
], WorkRequestEntity.prototype, "propertyType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: flooring_enum_1.FlooringEnum,
        type: "enum",
        default: flooring_enum_1.FlooringEnum.TERRIO,
    }),
    __metadata("design:type", String)
], WorkRequestEntity.prototype, "flooring", void 0);
__decorate([
    (0, typeorm_1.Column)({
        enum: prevailing_construction_materials_enum_1.PrevalingConstructionMaterialsEnum,
        type: "enum",
        default: prevailing_construction_materials_enum_1.PrevalingConstructionMaterialsEnum.TIJOLO,
    }),
    __metadata("design:type", String)
], WorkRequestEntity.prototype, "prevailingConstructionMaterials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_entity_1.RoomEntity, room => room.workRequest, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], WorkRequestEntity.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_request_welfare_entity_1.WorkRequestWelfareEntity, workRequestWelfare => workRequestWelfare.workRequest, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], WorkRequestEntity.prototype, "welfare", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: technical_visit_status_enum_1.TechnicalVisitStatusEnum,
        default: technical_visit_status_enum_1.TechnicalVisitStatusEnum.PENDENTE,
    }),
    __metadata("design:type", String)
], WorkRequestEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => satisfaction_research_entity_1.SatisfactionResearchEntity, satisfaction => satisfaction.workRequest, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", satisfaction_research_entity_1.SatisfactionResearchEntity)
], WorkRequestEntity.prototype, "satisfaction", void 0);
exports.WorkRequestEntity = WorkRequestEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "work_request" })
], WorkRequestEntity);
//# sourceMappingURL=work-request.entity.js.map