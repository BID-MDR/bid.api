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
exports.EmployeeBackofficeService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const employee_status_enum_1 = require("../../data-interaction/database/enums/employee-status.enum");
const company_repository_1 = require("../../data-interaction/database/repositories/company/company.repository");
const employee_repository_1 = require("../../data-interaction/database/repositories/employee/employee.repository");
const demand_repository_1 = require("../../data-interaction/database/repositories/user/demand.repository");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
let EmployeeBackofficeService = class EmployeeBackofficeService extends base_service_1.BaseService {
    userRepository;
    companyRepository;
    employeeRepository;
    demandRepository;
    constructor(userRepository, companyRepository, employeeRepository, demandRepository) {
        super(employeeRepository);
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.demandRepository = demandRepository;
    }
    async register(data, userId) {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new common_1.BadRequestException("Usuário não encontrado.");
        }
        if (user.companyAdministrator) {
            throw new common_1.BadRequestException("Usuário já é administrador de uma empresa.");
        }
        if (user.employee) {
            throw new common_1.BadRequestException("Usuário já é funcionário de uma empresa.");
        }
        const company = await this.companyRepository.findById(data.companyId);
        if (!company) {
            throw new common_1.BadRequestException("Empresa não encontrada.");
        }
        return await this.employeeRepository.create({
            user,
            company,
            status: employee_status_enum_1.EmployeeStatusEnum.PENDING,
            roles: [],
        });
    }
    async activeEmployee(employeeId, userId) {
        const user = await this.userRepository.getById(userId);
        if (!user.companyAdministrator) {
            throw new common_1.BadRequestException("Usuário não é administrador da empresa.");
        }
        const employee = await this.employeeRepository.getById(employeeId);
        if (!employee) {
            throw new common_1.BadRequestException("Funcionário não encontrado.");
        }
        if (employee.status === employee_status_enum_1.EmployeeStatusEnum.ACTIVE) {
            throw new common_1.BadRequestException("Funcionário já está ativo.");
        }
        if (employee.company.id !== user.companyAdministrator.id) {
            throw new common_1.BadRequestException("Funcionário não pertence a empresa do usuário.");
        }
        return await this.employeeRepository.update(employeeId, {
            status: employee_status_enum_1.EmployeeStatusEnum.ACTIVE,
        });
    }
    async list() {
        return await this.employeeRepository.findAll();
    }
    async getById(id) {
        return await this.employeeRepository.findById(id);
    }
};
exports.EmployeeBackofficeService = EmployeeBackofficeService;
exports.EmployeeBackofficeService = EmployeeBackofficeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        company_repository_1.CompanyRepository,
        employee_repository_1.EmployeeRepository,
        demand_repository_1.DemandRepository])
], EmployeeBackofficeService);
//# sourceMappingURL=employee.service.js.map