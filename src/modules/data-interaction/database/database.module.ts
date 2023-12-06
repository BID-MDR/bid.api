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
import { CostEstimationEntity } from './entitites/cost-estimation.entity';
import { RoomSolutionEntity } from './entitites/room-solution.entity';
import { ContractEntity } from './entitites/contract.entity';
import { ConstructionEntity } from './entitites/construction.entity';
import { ConstructionRoomMediaEntity } from './entitites/construction-room-media.entity';
import { UserRatingEntity } from './entitites/user-rating.entity';

const ENTITIES = [
    UserEntity,
    UserRatingEntity,
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
    CostEstimationEntity,
    RoomSolutionEntity,
    ContractEntity,
    ConstructionEntity,
    ConstructionRoomMediaEntity,
];
const REPOSITORIES = [UserRepository];

@Module({
    imports: [
        TypeOrmModule.forFeature(ENTITIES),
    ],
    providers: [...REPOSITORIES],
    exports: [...REPOSITORIES],
})
export class DatabaseModule {}
