"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsoketModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./gateways/chat.gateway");
const chat_service_1 = require("./services/chat.service");
const core_module_1 = require("../../../core/core.module");
const message_module_1 = require("../../business-logic/message/message.module");
const message_module_2 = require("../../backoffice/message/message.module");
let WebsoketModule = class WebsoketModule {
};
exports.WebsoketModule = WebsoketModule;
exports.WebsoketModule = WebsoketModule = __decorate([
    (0, common_1.Module)({
        imports: [core_module_1.CoreModule, message_module_1.MessageModule, message_module_2.MessageBackofficeModule],
        providers: [chat_gateway_1.ChatGateway, chat_service_1.ChatService],
    })
], WebsoketModule);
//# sourceMappingURL=websoket.module.js.map