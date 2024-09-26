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
exports.EmployeeRoleEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../core/entities/base.entity");
const employee_role_enum_1 = require("../enums/employee-role.enum");
const employee_entity_1 = require("./employee.entity");
let EmployeeRoleEntity = class EmployeeRoleEntity extends base_entity_1.BaseEntity {
    role;
    description;
    active;
    employee;
};
exports.EmployeeRoleEntity = EmployeeRoleEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: employee_role_enum_1.EmployeeRoleEnum,
    }),
    __metadata("design:type", String)
], EmployeeRoleEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
        default: "Sem descrição",
    }),
    __metadata("design:type", String)
], EmployeeRoleEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: true,
    }),
    __metadata("design:type", Boolean)
], EmployeeRoleEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.EmployeeEntity, employee => employee.roles),
    __metadata("design:type", employee_entity_1.EmployeeEntity)
], EmployeeRoleEntity.prototype, "employee", void 0);
exports.EmployeeRoleEntity = EmployeeRoleEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "employee_role" })
], EmployeeRoleEntity);
//# sourceMappingURL=employee-role.entity.js.map