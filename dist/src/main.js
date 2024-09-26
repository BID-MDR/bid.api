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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = __importStar(require("body-parser"));
const class_validator_1 = require("class-validator");
require("reflect-metadata");
const environment_variables_enum_1 = require("./core/enums/environment-variables.enum");
const class_trasnformer_pipe_1 = require("./core/pipes/class-trasnformer.pipe");
const api_response_interceptor_1 = require("./core/interceptors/api-response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new common_1.Logger("main");
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new class_trasnformer_pipe_1.ParseToClassPipe(), new common_1.ValidationPipe({
        forbidUnknownValues: false,
        skipMissingProperties: false,
        skipUndefinedProperties: false,
        skipNullProperties: false,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalInterceptors(new api_response_interceptor_1.ResponseInterceptor(app.get(core_1.Reflector)));
    if (configService.get(environment_variables_enum_1.EnviromentVariablesEnum.ENABLE_CORS) === "true") {
        const corsOptions = {
            origin: "*",
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: false,
            allowedHeaders: "Content-Type,Accept,Authorization",
        };
        app.enableCors(corsOptions);
        logger.debug("CORS ENABLED");
    }
    const appVersion = configService.get(environment_variables_enum_1.EnviromentVariablesEnum.APP_VERSION);
    const appName = "BID - API";
    if (configService.get(environment_variables_enum_1.EnviromentVariablesEnum.ENABLE_DOCS) === "true") {
        const swaggerOptions = new swagger_1.DocumentBuilder()
            .setTitle(appName +
            ` - ${configService.get(environment_variables_enum_1.EnviromentVariablesEnum.NODE_ENV)?.toUpperCase()}`)
            .setVersion(appVersion)
            .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
        })
            .build();
        if (configService.get(environment_variables_enum_1.EnviromentVariablesEnum.NODE_ENV) !==
            "development") {
            app.setGlobalPrefix(configService.get(environment_variables_enum_1.EnviromentVariablesEnum.SERVER_PATH_PREFIX));
        }
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions, {
            ignoreGlobalPrefix: false,
        });
        swagger_1.SwaggerModule.setup("/docs", app, document, {
            useGlobalPrefix: true,
        });
        logger.debug("DOCS ENABLED");
    }
    const port = configService.get(environment_variables_enum_1.EnviromentVariablesEnum.PORT) || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port} - ${configService
        .get(environment_variables_enum_1.EnviromentVariablesEnum.NODE_ENV)}`);
}
bootstrap();
//# sourceMappingURL=main.js.map