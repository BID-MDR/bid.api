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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRepository = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const environment_variables_enum_1 = require("../../../../../../core/enums/environment-variables.enum");
let EmailRepository = class EmailRepository {
    _client;
    _configService;
    constructor(_client, _configService) {
        this._client = _client;
        this._configService = _configService;
    }
    async send(to, subject, text, html) {
        const msg = {
            to,
            from: this._configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SENDGRID_EMAIL_SENDER),
            subject,
            text,
            html,
        };
        await this._client.send(msg);
    }
};
exports.EmailRepository = EmailRepository;
exports.EmailRepository = EmailRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_sendgrid_1.InjectSendGrid)()),
    __metadata("design:paramtypes", [nestjs_sendgrid_1.SendGridService,
        config_1.ConfigService])
], EmailRepository);
//# sourceMappingURL=email.repository.js.map