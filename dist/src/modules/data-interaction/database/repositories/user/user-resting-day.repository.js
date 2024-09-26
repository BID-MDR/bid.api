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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseRestingDayRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const base_repository_1 = require("../../../../../core/repositories/base.repository");
const typeorm_2 = require("typeorm");
const user_resting_day_entity_1 = require("../../entitites/user-resting-day.entity");
let UseRestingDayRepository = class UseRestingDayRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async findAllByUserProfessionalInfoId(userProfessionalInfoId) {
        return await this.repository
            .createQueryBuilder('userRestingDay')
            .where('userRestingDay.userProfessionalInfoId = :userProfessionalInfoId', { userProfessionalInfoId })
            .getMany();
    }
};
exports.UseRestingDayRepository = UseRestingDayRepository;
exports.UseRestingDayRepository = UseRestingDayRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_resting_day_entity_1.UserRestingDayEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UseRestingDayRepository);
//# sourceMappingURL=user-resting-day.repository.js.map