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
exports.ConfeaSubsystem = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const environment_variables_enum_1 = require("../../../../../../core/enums/environment-variables.enum");
let ConfeaSubsystem = class ConfeaSubsystem {
    configService;
    httpClient;
    constructor(configService, httpClient) {
        this.configService = configService;
        this.httpClient = httpClient;
    }
    async getProfessionalRegistrationStatusFromConfea(cpf) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpClient.get(`${this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.CONFEA_ENDPOINT)}/${cpf}`, {
            headers: {
                tokenAcesso: `Bearer ${this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.CONFEA_ACCESS_TOKEN)}`,
            },
        }));
        return {
            registered: 'message' in response.data,
            active: 'message' in response.data,
            registryNumber: 'rnp' in response.data ? response.data.rnp : null,
        };
    }
};
exports.ConfeaSubsystem = ConfeaSubsystem;
exports.ConfeaSubsystem = ConfeaSubsystem = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, axios_1.HttpService])
], ConfeaSubsystem);
//# sourceMappingURL=confea.subsystem.js.map