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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const base_repository_1 = require("../../../../../core/repositories/base.repository");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../entitites/user.entity");
const user_type_enum_1 = require("../../enums/user-type.enum");
const date_fns_1 = require("date-fns");
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async findByCpf(cpf) {
        return this.repository.findOne({ where: { cpf } });
    }
    async getById(_id) {
        return this.repository.findOne({
            where: { id: _id },
            relations: {
                companyAdministrator: true,
                employee: {
                    company: true,
                    roles: true,
                },
                beneficiaryUserInfo: true,
                technicalVisitsAsBeneficiary: true,
                technicalVisitsAsProfessional: true,
            },
        });
    }
    async getForGuard(_id) {
        return this.repository.findOne({
            where: { id: _id },
            relations: {
                companyAdministrator: true,
                employee: {
                    company: true,
                    roles: true,
                },
            },
        });
    }
    async updateUserProgramType(_id, programType) {
        return this.repository.update(_id, { programType });
    }
    async list() {
        return this.repository.find();
    }
    async listBeneficiary() {
        return this.repository.find({ where: { type: user_type_enum_1.UserTypeEnum.BENEFICIARIO } });
    }
    async findMonth(month) {
        const now = new Date();
        const pastDate = (0, date_fns_1.addMonths)(now, -month);
        return this.repository.createQueryBuilder('user')
            .where('user.type = :type', { type: user_type_enum_1.UserTypeEnum.BENEFICIARIO })
            .andWhere('user.createdAt BETWEEN :pastDate AND :now', {
            pastDate: pastDate.toISOString(),
            now: now.toISOString(),
        })
            .getMany();
    }
    async getByCpf(cpf) {
        return this.repository.findOne({ where: { cpf } });
    }
    async getFirstBeneficiary() {
        return this.repository.findOne({
            order: {
                createdAt: "ASC",
            },
            where: {
                type: user_type_enum_1.UserTypeEnum.BENEFICIARIO,
            },
        });
    }
    async getFirstProfessional() {
        return this.repository.findOne({
            order: {
                createdAt: "ASC",
            },
            where: {
                type: user_type_enum_1.UserTypeEnum.PROFISSIONAL,
            },
        });
    }
    async updateProfilePicture(userId, pictureProfile) {
        return this.repository.update({
            id: userId,
        }, { profilePicture: pictureProfile });
    }
    async getDashboardDataWithJoinBeneficiary(userId) {
        return await this.repository
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.beneficiaryUserInfo", "user-beneficiary-info")
            .leftJoinAndSelect("user.technicalVisitsAsBeneficiary", "technical-visit")
            .where("user.id = :userId", { userId })
            .getOne();
    }
    async getDashboardDataWithJoinProfessional(userId) {
        return await this.repository
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.userProfessionalInfo", "user-professional-info")
            .leftJoinAndSelect("user.technicalVisitsAsProfessional", "technical-visit")
            .where("user.id = :userId", { userId })
            .getOne();
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map