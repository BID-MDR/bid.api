import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnviromentVariablesEnum } from 'src/core/enums/environment-variables.enum';
import { AddressEntity } from './entitites/address.entity';
import { BeneficiaryUserInfoEntity } from './entitites/beneficiary-user-info.entity';
import { ProfessionalUserInfoEntity } from './entitites/professional-user-info.entity';
import { UserEntity } from './entitites/user.entity';
import { UserRepository } from './repositories/user.repository';
import { WorkRequestEntity } from './entitites/work-request.entity';
import { WorkRequestMediaEntity } from './entitites/work-request-media.entity';
import { WorkRequestRoomToWorkEntity } from './entitites/work-request-room-to-work.entity';
import { WorkRequestRoomTypeQuantityEntity } from './entitites/work-request-room-type-quantity.entity';
import { WorkRequestPrevailingConstructionMaterialEntity } from './entitites/work-request-prevailing-construction-materials.entity';
import { WorkRequestWelfareProgramEntity } from './entitites/work-request-welfare-program.entity';
import { WorkRequestPrecarityEntity } from './entitites/work-request-precarity.entity';
import { TechnicalVisitEntity } from './entitites/technical-visit.entity';

const ENTITIES = [
    UserEntity,
    AddressEntity,
    BeneficiaryUserInfoEntity,
    ProfessionalUserInfoEntity,
    WorkRequestRoomToWorkEntity,
    WorkRequestRoomTypeQuantityEntity,
    WorkRequestEntity,
    WorkRequestMediaEntity,
    WorkRequestPrevailingConstructionMaterialEntity,
    WorkRequestWelfareProgramEntity,
    WorkRequestPrecarityEntity,
    TechnicalVisitEntity,
];
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
