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
exports.GovbrSubsystem = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const environment_variables_enum_1 = require("../../../../../../core/enums/environment-variables.enum");
let GovbrSubsystem = class GovbrSubsystem {
    configService;
    httpService;
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
    }
    async login(code, codeVerifier) {
        return (console.log(`https://sso.staging.acesso.gov.br/token?grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.API_URL) +
            this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SERVER_PATH_PREFIX) +
            '/govbr/sso')}&code_verifier=${codeVerifier}`),
            await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://sso.staging.acesso.gov.br/token?grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.API_URL) +
                this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SERVER_PATH_PREFIX) +
                '/govbr/sso')}&code_verifier=${codeVerifier}`, undefined, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.GOVBR_CLIENT_ID) +
                        ':' +
                        this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.GOVBR_CLIENT_SECRET)).toString('base64')}`,
                },
            }))).data;
    }
    async getJwk() {
        return (await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://sso.staging.acesso.gov.br/jwk'))).data.keys[0];
    }
};
exports.GovbrSubsystem = GovbrSubsystem;
exports.GovbrSubsystem = GovbrSubsystem = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], GovbrSubsystem);
//# sourceMappingURL=govbr.subsystem.js.map