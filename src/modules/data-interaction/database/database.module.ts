import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entitites/address.entity';
import { ConstructionRoomMediaEntity } from './entitites/construction-room-media.entity';
import { ConstructionEntity } from './entitites/construction.entity';
import { ContractEntity } from './entitites/contract.entity';
import { CostEstimationEntity } from './entitites/cost-estimation.entity';
import { RoomSolutionEntity } from './entitites/room-solution.entity';
import { TechnicalVisitEntity } from './entitites/technical-visit.entity';
import { UserBeneficiaryInfoEntity } from './entitites/user-beneficiary-info.entity';
import { UserProfessionalInfoEntity } from './entitites/user-professional-info.entity';
import { UserRatingEntity } from './entitites/user-rating.entity';
import { UserEntity } from './entitites/user.entity';
import { WorkRequestMediaEntity } from './entitites/work-request-media.entity';
import { WorkRequestPrecarityEntity } from './entitites/work-request-precarity.entity';
import { WorkRequestPrevailingConstructionMaterialEntity } from './entitites/work-request-prevailing-construction-materials.entity';
import { WorkRequestRoomToWorkEntity } from './entitites/work-request-room-to-work.entity';
import { WorkRequestRoomTypeQuantityEntity } from './entitites/work-request-room-type-quantity.entity';
import { WorkRequestWelfareProgramEntity } from './entitites/work-request-welfare-program.entity';
import { WorkRequestEntity } from './entitites/work-request.entity';
import { UserRepository } from './repositories/user/user.repository';
import { UserRestingDayEntity } from './entitites/user-resting-day.entity';
import { UserAppointmentEntity } from './entitites/user-appointment.entity';
import { UserOtpRequestEntity } from './entitites/user-otp-request.entity';
import { UserAppointmentRepository } from './repositories/user/user-appointment.repository';
import { UserRatingRepository } from './repositories/user/user-rating.repository';
import { UserBeneficiaryInfoRepository } from './repositories/user/user-beneficiary-info.repository';
import { UseRestingDayRepository } from './repositories/user/user-resting-day.repository';
import { UserProfessionalInfoRepository } from './repositories/user/user-professional-info.repository';
import { AddressRepository } from './repositories/address.repository';

const ENTITIES = [
    UserEntity,
    UserRatingEntity,
    UserBeneficiaryInfoEntity,
    UserProfessionalInfoEntity,
    UserRestingDayEntity,
    UserAppointmentEntity,
    UserOtpRequestEntity,
    WorkRequestRoomToWorkEntity,
    WorkRequestRoomTypeQuantityEntity,
    WorkRequestEntity,
    WorkRequestMediaEntity,
    WorkRequestPrevailingConstructionMaterialEntity,
    WorkRequestWelfareProgramEntity,
    WorkRequestPrecarityEntity,
    ConstructionEntity,
    ConstructionRoomMediaEntity,
    TechnicalVisitEntity,
    CostEstimationEntity,
    RoomSolutionEntity,
    ContractEntity,
    AddressEntity,
];
const REPOSITORIES = [
    UserRepository,
    UserAppointmentRepository,
    UserRatingRepository,
    UserBeneficiaryInfoRepository,
    UseRestingDayRepository,
    UserProfessionalInfoRepository,
    AddressRepository,
];

@Module({
    imports: [TypeOrmModule.forFeature(ENTITIES)],
    providers: [...REPOSITORIES],
    exports: [...REPOSITORIES],
})
export class DatabaseModule {}
