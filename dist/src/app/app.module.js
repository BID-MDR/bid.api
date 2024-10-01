"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const core_module_1 = require("../core/core.module");
const environment_variables_enum_1 = require("../core/enums/environment-variables.enum");
const exception_filter_1 = require("../core/filters/exception.filter");
const business_logic_module_1 = require("../modules/business-logic/business-logic.module");
const data_interaction_module_1 = require("../modules/data-interaction/data-interaction.module");
const facade_module_1 = require("../modules/data-interaction/facade/facade.module");
const app_controller_1 = require("./app.controller");
const event_emitter_1 = require("@nestjs/event-emitter");
const serve_static_1 = require("@nestjs/serve-static");
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
const websoket_module_1 = require("../modules/data-interaction/websoket/websoket.module");
const backoffice_module_1 = require("../modules/backoffice/backoffice.module");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.register(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
            }),
            serve_static_1.ServeStaticModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const rootPath = (0, path_1.join)(__dirname, '..', '..', '..', 'src', 'client', 'govbr-sso', 'development');
                    console.log(rootPath);
                    return [
                        {
                            rootPath: rootPath,
                            renderPath: '/govbr/sso',
                            exclude: ['/api/(.*)'],
                        },
                    ];
                },
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mariadb',
                    host: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SQL_SERVER_ADDRESS),
                    port: Number(configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SQL_SERVER_PORT)),
                    username: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SQL_SERVER_USER),
                    password: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SQL_SERVER_PASSWORD),
                    database: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SQL_SERVER_DATABASE),
                    autoLoadEntities: true,
                    synchronize: configService.get(environment_variables_enum_1.EnviromentVariablesEnum.NODE_ENV) === 'development',
                }),
                inject: [config_1.ConfigService],
            }),
            business_logic_module_1.BusinessLogicModule,
            backoffice_module_1.BackofficeModule,
            websoket_module_1.WebsoketModule,
            data_interaction_module_1.DataInteractionModule,
            core_module_1.CoreModule,
            facade_module_1.FacadeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.ServerExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map