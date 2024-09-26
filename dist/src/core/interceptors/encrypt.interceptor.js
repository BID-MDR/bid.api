"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptInterceptor = void 0;
const common_1 = require("@nestjs/common");
const crypto_util_1 = __importDefault(require("../utils/crypto.util"));
const environment_variables_enum_1 = require("./../enums/environment-variables.enum");
class EncryptInterceptor {
    intercept(context, next) {
        const payloadKey = process.env[environment_variables_enum_1.EnviromentVariablesEnum.PAYLOAD_ENCRYPT_KEY] || '';
        const payload = context.switchToHttp().getRequest().body.payload;
        if (process.env[environment_variables_enum_1.EnviromentVariablesEnum.NODE_ENV] !== 'production') {
            return next.handle();
        }
        if (!payload)
            throw new common_1.HttpException('Payload é obrigatório!', common_1.HttpStatus.BAD_REQUEST);
        const decryptedBody = JSON.parse(crypto_util_1.default.decrypt(payloadKey, context.switchToHttp().getRequest().body.payload) || '');
        if (!decryptedBody)
            throw new common_1.HttpException('Erro ao descriptografar o payload!', common_1.HttpStatus.BAD_REQUEST);
        context.switchToHttp().getRequest().body = decryptedBody;
        return next.handle();
    }
}
exports.EncryptInterceptor = EncryptInterceptor;
//# sourceMappingURL=encrypt.interceptor.js.map