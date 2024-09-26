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
exports.DemandEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const work_request_entity_1 = require("./work-request.entity");
const technical_visit_entity_1 = require("./technical-visit.entity");
const demand_status_enum_1 = require("../enums/demand-status.enum");
const constructions_entity_1 = require("./constructions.entity");
const company_entity_1 = require("./company.entity");
let DemandEntity = class DemandEntity extends base_entity_1.BaseEntity {
    document;
    state;
    city;
    zipcode;
    complement;
    neighborhood;
    number;
    street;
    latitude;
    longitude;
    status;
    conclusionDate;
    beneficiary;
    company;
    workRequest;
    technicalVisit;
    construction;
};
exports.DemandEntity = DemandEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 2,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 11,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "zipcode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
        nullable: true,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "complement", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 50,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 10,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 30,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 30,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 30,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(demand_status_enum_1.DemandStatusEnum),
        default: demand_status_enum_1.DemandStatusEnum.RASCUNHO,
    }),
    __metadata("design:type", String)
], DemandEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        nullable: true,
    }),
    __metadata("design:type", Date)
], DemandEntity.prototype, "conclusionDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.demands, {
        eager: true,
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], DemandEntity.prototype, "beneficiary", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.CompanyEntity, company => company.demands, {
        eager: true,
    }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], DemandEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => work_request_entity_1.WorkRequestEntity, workRequest => workRequest.demand, {
        cascade: true,
        eager: true,
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", work_request_entity_1.WorkRequestEntity)
], DemandEntity.prototype, "workRequest", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => technical_visit_entity_1.TechnicalVisitEntity, technical => technical.demand, {
        nullable: true,
        eager: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", technical_visit_entity_1.TechnicalVisitEntity)
], DemandEntity.prototype, "technicalVisit", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => constructions_entity_1.ConstructionsEntity, c => c.demand, {
        nullable: true,
        eager: true,
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", constructions_entity_1.ConstructionsEntity)
], DemandEntity.prototype, "construction", void 0);
exports.DemandEntity = DemandEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "demands" })
], DemandEntity);
//# sourceMappingURL=demand.entity.js.map