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
exports.HelpBackofficeService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_repository_1 = require("../../data-interaction/database/repositories/user/user.repository");
const help_repository_1 = require("../../data-interaction/database/repositories/user/help.repository");
let HelpBackofficeService = class HelpBackofficeService extends base_service_1.BaseService {
    helpRepository;
    userRepository;
    server;
    constructor(helpRepository, userRepository) {
        super(helpRepository);
        this.helpRepository = helpRepository;
        this.userRepository = userRepository;
    }
    async getByMonth(month) {
        return await this.helpRepository.findMonth(month);
    }
    async register(clientId, data) {
        data.user = await this.userRepository.getById(clientId);
        data.sentAt = new Date();
        console.log('data', data);
        const help = await super.create(data);
        return help;
    }
    async delete(helpId) {
        return await this.helpRepository.hardDelete(helpId);
    }
    async getById(helpId) {
        return await this.helpRepository.getById(helpId);
    }
    async listByUser(userId) {
        const user = await this.userRepository.getById(userId);
        return await this.helpRepository.listAllMsgByUser(user);
    }
    async list() {
        return await this.helpRepository.list();
    }
};
exports.HelpBackofficeService = HelpBackofficeService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], HelpBackofficeService.prototype, "server", void 0);
exports.HelpBackofficeService = HelpBackofficeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [help_repository_1.HelpRepository,
        user_repository_1.UserRepository])
], HelpBackofficeService);
//# sourceMappingURL=help.service.js.map