"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackofficeModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const user_roles_module_1 = require("./user-roles/user-roles.module");
const authenticate_module_1 = require("./authenticate/authenticate.module");
const demand_module_1 = require("./demand/demand.module");
const company_module_1 = require("./company/company.module");
const employee_module_1 = require("./employee/employee.module");
const help_module_1 = require("./help/help.module");
const satisfaction_research_module_1 = require("./satisfaction-research/satisfaction-research.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const message_module_1 = require("./message/message.module");
let BackofficeModule = class BackofficeModule {
};
exports.BackofficeModule = BackofficeModule;
exports.BackofficeModule = BackofficeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            user_roles_module_1.UserRoleModule,
            authenticate_module_1.AuthenticateModule,
            demand_module_1.DemandBackofficeModule,
            company_module_1.CompanyBackofficeModule,
            employee_module_1.EmployeeBackofficeModule,
            help_module_1.HelpBackofficeModule,
            satisfaction_research_module_1.SatisfactionResearchBackofficeModule,
            dashboard_module_1.DashboardBackofficeModule,
            message_module_1.MessageBackofficeModule
        ],
    })
], BackofficeModule);
//# sourceMappingURL=backoffice.module.js.map