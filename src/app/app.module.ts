import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { BusinessLogicModule } from 'src/modules/business-logic/business-logic.module';
import { DataInteractionModule } from 'src/modules/data-interaction/data-interaction.module';
import { ServerExceptionFilter } from 'src/core/filters/exception.filter';
import { CoreModule } from 'src/core/core.module';

import * as dotenv from 'dotenv';
import { FacadeModule } from 'src/modules/data-interaction/facade/facade.module';
dotenv.config();

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),
        BusinessLogicModule,
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
