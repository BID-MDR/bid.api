"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfeaModule = void 0;
const common_1 = require("@nestjs/common");
const confea_subsystem_1 = require("./confea.subsystem");
const confea_facade_1 = require("./confea.facade");
const axios_1 = require("@nestjs/axios");
let ConfeaModule = class ConfeaModule {
};
exports.ConfeaModule = ConfeaModule;
exports.ConfeaModule = ConfeaModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [confea_subsystem_1.ConfeaSubsystem, confea_facade_1.ConfeaFacade],
        exports: [confea_facade_1.ConfeaFacade],
    })
], ConfeaModule);
//# sourceMappingURL=confea.module.js.map