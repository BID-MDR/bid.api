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
exports.SendGridSubsystem = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mail_1 = require("@sendgrid/mail");
const environment_variables_enum_1 = require("../../../../../core/enums/environment-variables.enum");
let SendGridSubsystem = class SendGridSubsystem {
    configService;
    sendGridClient = new mail_1.MailService();
    constructor(configService) {
        this.configService = configService;
        this.sendGridClient.setApiKey(this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SENDGRID_API_KEY));
    }
    async sendPasswordResetCodeEmail(code, userEmail) {
        const message = {
            to: userEmail,
            from: this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SENDGRID_EMAIL_SENDER),
            subject: 'Recuperação de senha',
            text: `Seu código de recuperação de senha é: ${code}`,
            html: `<strong>Seu código de recuperação de senha é: ${code}</strong>`,
        };
        return this.sendGridClient.send(message);
    }
};
exports.SendGridSubsystem = SendGridSubsystem;
exports.SendGridSubsystem = SendGridSubsystem = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SendGridSubsystem);
//# sourceMappingURL=send-grid.subsystem.js.map