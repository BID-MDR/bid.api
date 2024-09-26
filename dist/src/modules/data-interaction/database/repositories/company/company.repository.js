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
exports.CompanyRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_repository_1 = require("../../../../../core/repositories/base.repository");
const company_entity_1 = require("../../entitites/company.entity");
const date_fns_1 = require("date-fns");
let CompanyRepository = class CompanyRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async getByOwner(ownerId) {
        return this.repository.find({
            where: { userAdmin: { id: ownerId } },
            relations: ['employees', 'demands', 'userAdmin'],
        });
    }
    async findMonth(month) {
        const now = new Date();
        const pastDate = (0, date_fns_1.addMonths)(now, -month);
        return this.repository.createQueryBuilder('company')
            .where('company.createdAt BETWEEN :pastDate AND :now', {
            pastDate: pastDate.toISOString(),
            now: now.toISOString(),
        })
            .getMany();
    }
    async getByEmployee(userId) {
        return this.repository.createQueryBuilder("company")
            .leftJoinAndSelect("company.employees", "employees")
            .leftJoinAndSelect("employees.user", "user")
            .where("user.id = :userId", { userId })
            .getOne();
    }
    async find() {
        return await this.repository.createQueryBuilder("company")
            .leftJoinAndSelect("company.employees", "employees")
            .leftJoinAndSelect("employees.user", "user")
            .getMany();
    }
};
exports.CompanyRepository = CompanyRepository;
exports.CompanyRepository = CompanyRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyRepository);
//# sourceMappingURL=company.repository.js.map