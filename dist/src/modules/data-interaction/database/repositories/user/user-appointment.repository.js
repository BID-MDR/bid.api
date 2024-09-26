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
exports.UserAppointmentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const base_repository_1 = require("../../../../../core/repositories/base.repository");
const typeorm_2 = require("typeorm");
const user_appointment_entity_1 = require("../../entitites/user-appointment.entity");
let UserAppointmentRepository = class UserAppointmentRepository extends base_repository_1.BaseRepository {
    repository;
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async listByUserId(userId) {
        return await this.repository
            .createQueryBuilder('appointment')
            .where('appointment.professionalId = :userId', { userId })
            .orWhere('appointment.beneficiaryId = :userId', { userId })
            .getMany();
    }
    async areDatesWithinAnyAppointment(specificDates) {
        const query = this.repository.createQueryBuilder('appointment');
        for (let index = 0; index < specificDates.length; index++) {
            if (index === 0) {
                query
                    .where(`:date BETWEEN appointment.from AND appointment.to`)
                    .setParameter('date', new Date(specificDates[index]));
            }
            else {
                query.orWhere(':specificDate BETWEEN appointment.from AND appointment.to', {
                    specificDate: new Date(specificDates[index]),
                });
            }
        }
        const count = await query.getCount();
        return count > 0;
    }
};
exports.UserAppointmentRepository = UserAppointmentRepository;
exports.UserAppointmentRepository = UserAppointmentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_appointment_entity_1.UserAppointmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserAppointmentRepository);
//# sourceMappingURL=user-appointment.repository.js.map