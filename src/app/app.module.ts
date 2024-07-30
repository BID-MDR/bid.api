import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CoreModule } from 'src/core/core.module';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { ServerExceptionFilter } from 'src/core/filters/exception.filter';
import { BusinessLogicModule } from 'src/modules/business-logic/business-logic.module';
import { DataInteractionModule } from 'src/modules/data-interaction/data-interaction.module';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
import { AppController } from './app.controller';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule, ServeStaticModuleOptions } from '@nestjs/serve-static';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { WebsoketModule } from 'src/modules/data-interaction/websoket/websoket.module';

dotenv.config();

@Module({
    imports: [
        CacheModule.register(),
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
        ServeStaticModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): ServeStaticModuleOptions[] => {
                return [
                    {
                        rootPath: join(
                            __dirname,
                            '..',
                            'client/govbr-sso/' + configService.get(EnviromentVariablesEnum.NODE_ENV),
                        ),
                        renderPath: '/govbr/sso',
                        exclude: ['/api/(.*)'],
                    },
                ];
            },
        }),
        EventEmitterModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: 'mariadb',
                host: configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_ADDRESS),
                port: Number(configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_PORT)),
                username: configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_USER),
                password: configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_PASSWORD),
                database: configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_DATABASE),
                autoLoadEntities: true,
                synchronize: configService.get(EnviromentVariablesEnum.NODE_ENV) === 'development',
            }),
            inject: [ConfigService],
        }),
        BusinessLogicModule,
        WebsoketModule,
        DataInteractionModule,
        CoreModule,
        FacadeModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ServerExceptionFilter,
        },
    ],
})
export class AppModule {}
