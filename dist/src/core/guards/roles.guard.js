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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const user_repository_1 = require("../../modules/data-interaction/database/repositories/user/user.repository");
const roles_decorator_1 = require("../decorators/roles.decorator");
const employee_status_enum_1 = require("../../modules/data-interaction/database/enums/employee-status.enum");
let RolesGuard = class RolesGuard {
    reflector;
    userRepository;
    constructor(reflector, userRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const roles = this.reflector.get(roles_decorator_1.Roles, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const userId = request.user.userId;
        if (roles.length === 0) {
            return true;
        }
        const user = await this.userRepository.getForGuard(userId);
        if (user.companyAdministrator) {
            return true;
        }
        if (!user) {
            throw new common_1.UnauthorizedException('Requisição não autorizada.');
        }
        if (!user.employee) {
            throw new common_1.UnauthorizedException('Requisição não autorizada.');
        }
        if (user.employee.status !== employee_status_enum_1.EmployeeStatusEnum.ACTIVE) {
            throw new common_1.UnauthorizedException('Requisição não autorizada.');
        }
        return user.employee.roles.some(role => roles.includes(role.role) && role.active);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_repository_1.UserRepository])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map