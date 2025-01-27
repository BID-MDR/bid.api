import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { FacadeModule } from './facade/facade.module';
import { WebsoketModule } from './websoket/websoket.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';

@Module({
    imports: [
        SendGridModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                apiKey: configService.get(EnviromentVariablesEnum.SENDGRID_API_KEY),
            }),
            inject: [ConfigService],
        }),
        DatabaseModule, 
        FacadeModule, 
        WebsoketModule,
        
    ],
})
export class DataInteractionModule {}
