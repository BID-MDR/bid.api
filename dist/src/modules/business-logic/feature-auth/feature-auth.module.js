"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureAuthModule = void 0;
const common_1 = require("@nestjs/common");
const feature_auth_controller_1 = require("./feature-auth.controller");
const feature_auth_service_1 = require("./feature-auth.service");
const govbr_module_1 = require("../../data-interaction/facade/apis/gov/govbr/govbr.module");
const database_module_1 = require("../../data-interaction/database/database.module");
const core_module_1 = require("../../../core/core.module");
let FeatureAuthModule = class FeatureAuthModule {
};
exports.FeatureAuthModule = FeatureAuthModule;
exports.FeatureAuthModule = FeatureAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [govbr_module_1.GovbrModule, database_module_1.DatabaseModule, core_module_1.CoreModule],
        controllers: [feature_auth_controller_1.FeatureAuthController],
        providers: [feature_auth_service_1.FeatureAuthService],
        exports: [feature_auth_service_1.FeatureAuthService],
    })
], FeatureAuthModule);
//# sourceMappingURL=feature-auth.module.js.map