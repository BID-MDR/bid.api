"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessLogicModule = void 0;
const common_1 = require("@nestjs/common");
const feature_user_module_1 = require("./feature-user/feature-user.module");
const feature_technical_visit_module_1 = require("./feature-technical-visit/feature-technical-visit.module");
const feature_auth_module_1 = require("./feature-auth/feature-auth.module");
const feature_notification_module_1 = require("./feature-notification/feature-notification.module");
const demand_module_1 = require("./demand/demand.module");
const message_module_1 = require("./message/message.module");
const work_request_module_1 = require("./work-request/work-request.module");
const feature_room_module_1 = require("./feature-room/feature-room.module");
const constructions_module_1 = require("./feature-constructions/constructions.module");
const help_module_1 = require("./help/help.module");
const company_module_1 = require("./feature-company/company.module");
const employee_module_1 = require("./feature-employee/employee.module");
const employee_role_module_1 = require("./feature-employee-role/employee-role.module");
const satisfaction_research_module_1 = require("./satisfaction-research/satisfaction-research.module");
let BusinessLogicModule = class BusinessLogicModule {
};
exports.BusinessLogicModule = BusinessLogicModule;
exports.BusinessLogicModule = BusinessLogicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            feature_user_module_1.FeatureUserModule,
            feature_technical_visit_module_1.FeatureTechnicalVisitModule,
            feature_auth_module_1.FeatureAuthModule,
            feature_notification_module_1.FeatureNotificationModule,
            demand_module_1.DemandModuleModule,
            message_module_1.MessageModule,
            work_request_module_1.WorkRequestModule,
            feature_room_module_1.FeatureRoomModule,
            constructions_module_1.ConstructionsModule,
            help_module_1.HelpModule,
            company_module_1.CompanyModule,
            employee_module_1.EmployeeModule,
            employee_role_module_1.EmployeeRoleModule,
            satisfaction_research_module_1.SatisfactionResearchModule
        ],
    })
], BusinessLogicModule);
//# sourceMappingURL=business-logic.module.js.map