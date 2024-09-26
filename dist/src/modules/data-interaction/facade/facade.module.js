"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacadeModule = void 0;
const common_1 = require("@nestjs/common");
const caub_module_1 = require("./apis/gov/caubr/caub.module");
const email_module_1 = require("./apis/email/email.module");
const storage_module_1 = require("./apis/storage/storage.module");
const confea_module_1 = require("./apis/gov/confea/confea.module");
const govbr_module_1 = require("./apis/gov/govbr/govbr.module");
let FacadeModule = class FacadeModule {
};
exports.FacadeModule = FacadeModule;
exports.FacadeModule = FacadeModule = __decorate([
    (0, common_1.Module)({
        imports: [caub_module_1.CaubModule, email_module_1.EmailModule, storage_module_1.StorageModule, confea_module_1.ConfeaModule, govbr_module_1.GovbrModule],
        exports: [caub_module_1.CaubModule, email_module_1.EmailModule, storage_module_1.StorageModule, confea_module_1.ConfeaModule, govbr_module_1.GovbrModule],
    })
], FacadeModule);
//# sourceMappingURL=facade.module.js.map