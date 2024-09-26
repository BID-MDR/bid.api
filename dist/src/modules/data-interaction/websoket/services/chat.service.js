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
exports.ChatService = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const environment_variables_enum_1 = require("../../../../core/enums/environment-variables.enum");
let ChatService = class ChatService {
    jwtService;
    configService;
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async authenticateUser(socket) {
        try {
            const jwtKeyWithoutPrefix = socket.handshake.auth.Authorization.split(' ')[1];
            this.jwtService.verify(jwtKeyWithoutPrefix, this.configService.get(environment_variables_enum_1.EnviromentVariablesEnum.JWT_PAYLOAD_KEY));
            const payload = this.jwtService.decode(jwtKeyWithoutPrefix);
        }
        catch (error) {
            socket.disconnect();
            throw new websockets_1.WsException('Credenciais inválidas!');
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, config_1.ConfigService])
], ChatService);
//# sourceMappingURL=chat.service.js.map