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
exports.UserRatingEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const user_type_enum_1 = require("../enums/user-type.enum");
const user_entity_1 = require("./user.entity");
const user_rating_type_enum_1 = require("../enums/user-rating-type.enum");
let UserRatingEntity = class UserRatingEntity extends base_entity_1.BaseEntity {
    professional;
    beneficiary;
    profesisonalInterationRating;
    programRating;
    platformRating;
    type;
};
exports.UserRatingEntity = UserRatingEntity;
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.UserEntity)
], UserRatingEntity.prototype, "professional", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.UserEntity)
], UserRatingEntity.prototype, "beneficiary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], UserRatingEntity.prototype, "profesisonalInterationRating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], UserRatingEntity.prototype, "programRating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], UserRatingEntity.prototype, "platformRating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_type_enum_1.UserTypeEnum,
    }),
    __metadata("design:type", String)
], UserRatingEntity.prototype, "type", void 0);
exports.UserRatingEntity = UserRatingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'user-rating' })
], UserRatingEntity);
//# sourceMappingURL=user-rating.entity.js.map