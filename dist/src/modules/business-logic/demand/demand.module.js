"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemandModuleModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../data-interaction/database/database.module");
const facade_module_1 = require("../../data-interaction/facade/facade.module");
const demand_controller_1 = require("./demand.controller");
const demand_service_1 = require("./demand.service");
let DemandModuleModule = class DemandModuleModule {
};
exports.DemandModuleModule = DemandModuleModule;
exports.DemandModuleModule = DemandModuleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            facade_module_1.FacadeModule,
        ],
        controllers: [demand_controller_1.DemandController],
        providers: [demand_service_1.DemandService],
    })
], DemandModuleModule);
//# sourceMappingURL=demand.module.js.map