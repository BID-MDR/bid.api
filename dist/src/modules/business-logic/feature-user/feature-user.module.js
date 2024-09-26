"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureUserModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../data-interaction/database/database.module");
const feature_user_service_1 = require("./feature-user.service");
const feature_user_controller_1 = require("./feature-user.controller");
const facade_module_1 = require("../../data-interaction/facade/facade.module");
const feature_auth_module_1 = require("../feature-auth/feature-auth.module");
let FeatureUserModule = class FeatureUserModule {
};
exports.FeatureUserModule = FeatureUserModule;
exports.FeatureUserModule = FeatureUserModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, facade_module_1.FacadeModule, feature_auth_module_1.FeatureAuthModule],
        providers: [feature_user_service_1.FeatureUserService],
        controllers: [feature_user_controller_1.FeatureUserController],
    })
], FeatureUserModule);
//# sourceMappingURL=feature-user.module.js.map