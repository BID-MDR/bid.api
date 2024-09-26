"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactionResearchBackofficeModule = void 0;
const common_1 = require("@nestjs/common");
const feature_auth_module_1 = require("../../business-logic/feature-auth/feature-auth.module");
const database_module_1 = require("../../data-interaction/database/database.module");
const facade_module_1 = require("../../data-interaction/facade/facade.module");
const satisfaction_research_service_1 = require("./satisfaction-research.service");
const satisfaction_research_controller_1 = require("./satisfaction-research.controller");
let SatisfactionResearchBackofficeModule = class SatisfactionResearchBackofficeModule {
};
exports.SatisfactionResearchBackofficeModule = SatisfactionResearchBackofficeModule;
exports.SatisfactionResearchBackofficeModule = SatisfactionResearchBackofficeModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, facade_module_1.FacadeModule, feature_auth_module_1.FeatureAuthModule],
        providers: [satisfaction_research_service_1.SatisfactionResearchBackofficeService],
        controllers: [satisfaction_research_controller_1.SatisfactionResearchBackofficeController],
    })
], SatisfactionResearchBackofficeModule);
//# sourceMappingURL=satisfaction-research.module.js.map