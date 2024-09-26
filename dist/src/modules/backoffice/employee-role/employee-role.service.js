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
exports.EmployeeRoleBackofficeService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const employee_repository_1 = require("../../data-interaction/database/repositories/employee/employee.repository");
const employee_role_repository_1 = require("../../data-interaction/database/repositories/employee/employee-role.repository");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
let EmployeeRoleBackofficeService = class EmployeeRoleBackofficeService extends base_service_1.BaseService {
    employeeRepository;
    employeeRoleRepository;
    userRepository;
    constructor(employeeRepository, employeeRoleRepository, userRepository) {
        super(employeeRoleRepository);
        this.employeeRepository = employeeRepository;
        this.employeeRoleRepository = employeeRoleRepository;
        this.userRepository = userRepository;
    }
    async register(data) {
        const employee = await this.employeeRepository.getById(data.employeeId);
        if (!employee)
            throw new common_1.BadRequestException("Funcionário não encontrado(a).");
        if (employee.roles.some(role => role.role === data.role)) {
            throw new common_1.BadRequestException("Funcionário já possui essa função.");
        }
        data.employee = employee;
        data.active = false;
        return await this.employeeRoleRepository.create(data);
    }
    async activeRole(roleId, userId) {
        const user = await this.userRepository.getById(userId);
        if (!user.companyAdministrator) {
            throw new common_1.BadRequestException("Usuário não é administrador da empresa.");
        }
        const employeeRole = await this.employeeRoleRepository.findById(roleId);
        if (!employeeRole)
            throw new common_1.BadRequestException("Função não encontrada.");
        return await this.employeeRoleRepository.update(roleId, { active: true });
    }
    async list() {
        return await this.employeeRoleRepository.findAll();
    }
    async hardDelete(id) {
        return await this.employeeRoleRepository.hardDelete(id);
    }
};
exports.EmployeeRoleBackofficeService = EmployeeRoleBackofficeService;
exports.EmployeeRoleBackofficeService = EmployeeRoleBackofficeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository,
        employee_role_repository_1.EmployeeRoleRepository,
        user_repository_1.UserRepository])
], EmployeeRoleBackofficeService);
//# sourceMappingURL=employee-role.service.js.map