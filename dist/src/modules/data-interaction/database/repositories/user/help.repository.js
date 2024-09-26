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
exports.HelpRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const base_repository_1 = require("../../../../../core/repositories/base.repository");
const typeorm_2 = require("typeorm");
const help_entity_1 = require("../../entitites/help.entity");
const date_fns_1 = require("date-fns");
let HelpRepository = class HelpRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async getById(_id) {
        return this.repository.findOne({ where: { id: _id } });
    }
    async listAllMsgByUser(user) {
        return await this.repository.createQueryBuilder('help')
            .innerJoinAndSelect('help.user', 'user')
            .where('user.id = :userId', { userId: user.id })
            .orderBy('help.sentAt', 'DESC')
            .getMany();
    }
    async list() {
        return this.repository.find();
    }
    async findMonth(month) {
        const now = new Date();
        const pastDate = (0, date_fns_1.addMonths)(now, -month);
        return this.repository.createQueryBuilder('help')
            .where('help.createdAt BETWEEN :pastDate AND :now', {
            pastDate: pastDate.toISOString(),
            now: now.toISOString(),
        })
            .getMany();
    }
};
exports.HelpRepository = HelpRepository;
exports.HelpRepository = HelpRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(help_entity_1.HelpEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HelpRepository);
//# sourceMappingURL=help.repository.js.map