import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import 'reflect-metadata';
import { EnviromentVariablesEnum } from './core/enums/environment-variables.enum';
import { ParseToClassPipe } from './core/pipes/class-trasnformer.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const logger = new Logger('main');

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.useGlobalPipes(
        new ParseToClassPipe(),
        new ValidationPipe({
            forbidUnknownValues: true,
            skipMissingProperties: false,
            skipUndefinedProperties: false,
            skipNullProperties: false,
            forbidNonWhitelisted: true,
        }),
    );
    // app.useGlobalInterceptors(new ApiReponseInterceptor(app.get(Reflector)));

    if (configService.get(EnviromentVariablesEnum.ENABLE_CORS) === 'true') {
        const corsOptions: CorsOptions = {
            origin: configService.get<string>(EnviromentVariablesEnum.ALLOWED_ORIGINS).split(','),
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            credentials: false,
            allowedHeaders: 'Content-Type,Accept,Authorization',
        };
        app.enableCors(corsOptions);

        logger.debug('CORS ENABLED');
    }

    const appVersion = configService.get(EnviromentVariablesEnum.APP_VERSION);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: appVersion,
    });

    const appName = 'BID - API';

    if (configService.get(EnviromentVariablesEnum.ENABLE_DOCS) === 'true') {
        const swaggerOptions = new DocumentBuilder()
            .setTitle(appName + ` - ${configService.get(EnviromentVariablesEnum.NODE_ENV)?.toUpperCase()}`)
            .setVersion(appVersion)
            .addBearerAuth({
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            })
            .build();

        if (configService.get(EnviromentVariablesEnum.NODE_ENV) !== 'development') {
            app.setGlobalPrefix(configService.get(EnviromentVariablesEnum.SERVER_PATH_PREFIX));
        }

        const document = SwaggerModule.createDocument(app, swaggerOptions, {
            ignoreGlobalPrefix: false,
        });

        SwaggerModule.setup('v' + appVersion + '/docs', app, document, {
            useGlobalPrefix: true,
        });

        logger.debug('DOCS ENABLED');
    }

    const port = configService.get(EnviromentVariablesEnum.PORT) || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port} - ${configService
            .get(EnviromentVariablesEnum.NODE_ENV)
            .toUpperCase()} MODE`,
    );
}

bootstrap();
