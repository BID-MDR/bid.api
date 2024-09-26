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
exports.UserBackofficeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const base_repository_1 = require("../../../../../../core/repositories/base.repository");
const typeorm_2 = require("typeorm");
const user_backoffice_entity_1 = require("../../../entitites/user-backoffice.entity");
let UserBackofficeRepository = class UserBackofficeRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async getById(_id) {
        return await this.repository.findOne({ where: { id: _id }, relations: { roles: true } });
    }
    async getForGuard(_id) {
        return this.repository.findOne({ where: { id: _id }, relations: { roles: true } });
    }
    async getByEmail(email) {
        return await this.repository.findOne({ where: { email }, relations: { roles: true } });
    }
    async updateLastAccess(userId, date) {
        return await this.repository.update({ id: userId }, { lastAccess: date });
    }
    async registerPassword(userId, password) {
        const user = await this.repository.findOne({ where: { id: userId } });
        user.password = password.password;
        return await user.save();
    }
};
exports.UserBackofficeRepository = UserBackofficeRepository;
exports.UserBackofficeRepository = UserBackofficeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_backoffice_entity_1.UserBackofficeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserBackofficeRepository);
//# sourceMappingURL=user.repository.js.map