import { Module } from '@nestjs/common';
import { ExistsInDBConstraint } from './decorators/class-validator/exists-in-db.validator';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token-strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnviromentVariablesEnum } from './enums/environment-variables.enum';
import { AppGateway } from './websocket/websocket';
import { FeatureNotificationModule } from 'src/modules/business-logic/feature-notification/feature-notification.module';
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get(EnviromentVariablesEnum.JWT_PAYLOAD_KEY),
                    signOptions: {
                        expiresIn: '8h',
                    },
                };
            },
            inject: [ConfigService],
        }),
        FeatureNotificationModule,
    ],
    providers: [ExistsInDBConstraint, JwtAccessTokenStrategy, AppGateway],
    exports: [ExistsInDBConstraint, JwtModule],
})

export class CoreModule { }
