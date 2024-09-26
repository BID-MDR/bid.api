"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtFactory = void 0;
const config_1 = require("@nestjs/config");
const environment_variables_enum_1 = require("../enums/environment-variables.enum");
exports.jwtFactory = {
    useFactory: async (configService) => ({
        secret: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.JWT_PAYLOAD_KEY),
        signOptions: {
            expiresIn: Number(environment_variables_enum_1.EnviromentVariablesEnum.JWT_ACCESS_TOKEN_EXPIRATION)
        }
    }),
    inject: [
        config_1.ConfigService
    ]
};
//# sourceMappingURL=jwt-factory.js.map