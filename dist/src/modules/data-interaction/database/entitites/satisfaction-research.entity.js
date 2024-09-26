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
exports.SatisfactionResearchEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const work_request_entity_1 = require("./work-request.entity");
const user_entity_1 = require("./user.entity");
let SatisfactionResearchEntity = class SatisfactionResearchEntity extends base_entity_1.BaseEntity {
    programGrade;
    plataformGrade;
    professionalGrade;
    comments;
    user;
    workRequest;
};
exports.SatisfactionResearchEntity = SatisfactionResearchEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], SatisfactionResearchEntity.prototype, "programGrade", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], SatisfactionResearchEntity.prototype, "plataformGrade", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], SatisfactionResearchEntity.prototype, "professionalGrade", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", String)
], SatisfactionResearchEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.satisfaction),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], SatisfactionResearchEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => work_request_entity_1.WorkRequestEntity, (workRequest) => workRequest.satisfaction),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", work_request_entity_1.WorkRequestEntity)
], SatisfactionResearchEntity.prototype, "workRequest", void 0);
exports.SatisfactionResearchEntity = SatisfactionResearchEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'satisfaction_research' })
], SatisfactionResearchEntity);
//# sourceMappingURL=satisfaction-research.entity.js.map