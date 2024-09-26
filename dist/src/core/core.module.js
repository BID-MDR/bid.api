"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const exists_in_db_validator_1 = require("./decorators/class-validator/exists-in-db.validator");
const jwt_access_token_strategy_1 = require("./strategies/jwt-access-token-strategy");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const environment_variables_enum_1 = require("./enums/environment-variables.enum");
const websocket_1 = require("./websocket/websocket");
const feature_notification_module_1 = require("../modules/business-logic/feature-notification/feature-notification.module");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    return {
                        secret: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.JWT_PAYLOAD_KEY),
                        signOptions: {
                            expiresIn: '8h',
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            feature_notification_module_1.FeatureNotificationModule,
        ],
        providers: [exists_in_db_validator_1.ExistsInDBConstraint, jwt_access_token_strategy_1.JwtAccessTokenStrategy, websocket_1.AppGateway],
        exports: [exists_in_db_validator_1.ExistsInDBConstraint, jwt_1.JwtModule],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map