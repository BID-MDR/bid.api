"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInteractionModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("./database/database.module");
const facade_module_1 = require("./facade/facade.module");
const websoket_module_1 = require("./websoket/websoket.module");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const config_1 = require("@nestjs/config");
const environment_variables_enum_1 = require("../../core/enums/environment-variables.enum");
let DataInteractionModule = class DataInteractionModule {
};
exports.DataInteractionModule = DataInteractionModule;
exports.DataInteractionModule = DataInteractionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_sendgrid_1.SendGridModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    apiKey: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SENDGRID_API_KEY),
                }),
                inject: [config_1.ConfigService],
            }),
            database_module_1.DatabaseModule,
            facade_module_1.FacadeModule,
            websoket_module_1.WebsoketModule
        ],
    })
], DataInteractionModule);
//# sourceMappingURL=data-interaction.module.js.map