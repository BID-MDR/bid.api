import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { UserEntity } from './entitites/user.entity';

const ENTITIES = [UserEntity];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: 'mysql',
                host: configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_ADDRESS),
                port: Number(configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_PORT)),
                username: configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_USER),
                password: configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_PASSWORD),
                database: configService.get<string>(EnviromentVariablesEnum.SQL_SERVER_DATABASE),
                entities: ENTITIES,
                synchronize:
                    configService.get<string>(EnviromentVariablesEnum.NODE_ENV) === 'development' ? true : false,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
