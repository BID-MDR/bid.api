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
exports.CompanyEntity = void 0;
const base_entity_1 = require("../../../../core/entities/base.entity");
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
const employee_entity_1 = require("./employee.entity");
const user_entity_1 = require("./user.entity");
const company_status_enum_1 = require("../enums/company-status.enum");
const demand_entity_1 = require("./demand.entity");
let CompanyEntity = class CompanyEntity extends base_entity_1.BaseEntity {
    name;
    cnpj;
    status;
    addresses;
    userAdmin;
    employees;
    demands;
};
exports.CompanyEntity = CompanyEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: company_status_enum_1.CompanyStatusEnum,
        default: company_status_enum_1.CompanyStatusEnum.PENDING
    }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.AddressEntity, address => address.company, { eager: true, cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.AddressEntity)
], CompanyEntity.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, user => user.companyAdministrator, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.UserEntity)
], CompanyEntity.prototype, "userAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.EmployeeEntity, employee => employee.company, { eager: true, cascade: true }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => demand_entity_1.DemandEntity, demand => demand.company),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "demands", void 0);
exports.CompanyEntity = CompanyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "company" })
], CompanyEntity);
//# sourceMappingURL=company.entity.js.map