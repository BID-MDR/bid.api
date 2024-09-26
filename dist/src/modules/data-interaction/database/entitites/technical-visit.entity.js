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
exports.TechnicalVisitEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const technical_visit_status_enum_1 = require("../enums/technical-visit-status.enum");
const user_entity_1 = require("./user.entity");
const demand_entity_1 = require("./demand.entity");
let TechnicalVisitEntity = class TechnicalVisitEntity extends base_entity_1.BaseEntity {
    from;
    to;
    professional;
    beneficiary;
    demand;
    status;
};
exports.TechnicalVisitEntity = TechnicalVisitEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
    }),
    __metadata("design:type", Date)
], TechnicalVisitEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
    }),
    __metadata("design:type", Date)
], TechnicalVisitEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.technicalVisitsAsProfessional),
    __metadata("design:type", user_entity_1.UserEntity)
], TechnicalVisitEntity.prototype, "professional", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.technicalVisitsAsBeneficiary),
    __metadata("design:type", user_entity_1.UserEntity)
], TechnicalVisitEntity.prototype, "beneficiary", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => demand_entity_1.DemandEntity, (demand) => demand.technicalVisit),
    __metadata("design:type", demand_entity_1.DemandEntity)
], TechnicalVisitEntity.prototype, "demand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: technical_visit_status_enum_1.TechnicalVisitStatusEnum,
        default: technical_visit_status_enum_1.TechnicalVisitStatusEnum.PENDENTE,
    }),
    __metadata("design:type", String)
], TechnicalVisitEntity.prototype, "status", void 0);
exports.TechnicalVisitEntity = TechnicalVisitEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'technical_visit' })
], TechnicalVisitEntity);
//# sourceMappingURL=technical-visit.entity.js.map