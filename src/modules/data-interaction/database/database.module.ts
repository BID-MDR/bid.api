import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { UserEntity } from './entitites/user.entity';
import { UserRepository } from './repositories/user.repository';
import { AddressEntity } from './entitites/address.entity';
import { BeneficiaryUserInfoEntity } from './entitites/beneficiary-user-info.entity';
import { ProfessionalUserInfoEntity } from './entitites/professional-user-info.entity';

const ENTITIES = [UserEntity, AddressEntity, BeneficiaryUserInfoEntity, ProfessionalUserInfoEntity];
const REPOSITORIES = [UserRepository];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
                type: 'mariadb',
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
    providers: [...REPOSITORIES],
    exports: [...REPOSITORIES],
})
export class DatabaseModule {}
