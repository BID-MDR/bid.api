import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entitites/address.entity';
import { ConstructionEntity } from './entitites/construction.entity';
import { ContractEntity } from './entitites/contract.entity';
import { CostEstimationEntity } from './entitites/cost-estimation.entity';
import { RoomSolutionEntity } from './entitites/room-solution.entity';
import { RoomEntity } from './entitites/room.entity';
import { TechnicalVisitEntity } from './entitites/technical-visit.entity';
import { UserAppointmentEntity } from './entitites/user-appointment.entity';
import { UserBeneficiaryInfoEntity } from './entitites/user-beneficiary-info.entity';
import { UserGeneratedMediaEntity } from './entitites/user-generated-media.entity';
import { UserOtpRequestEntity } from './entitites/user-otp-request.entity';
import { UserProfessionalInfoEntity } from './entitites/user-professional-info.entity';
import { UserRatingEntity } from './entitites/user-rating.entity';
import { UserRestingDayEntity } from './entitites/user-resting-day.entity';
import { UserEntity } from './entitites/user.entity';
import { WorkRequestPrecarityEntity } from './entitites/work-request-precarity.entity';
import { WorkRequestPrevailingConstructionMaterialEntity } from './entitites/work-request-prevailing-construction-materials.entity';
import { WorkRequestRoomToWorkEntity } from './entitites/work-request-room-to-work.entity';
import { WorkRequestRoomTypeQuantityEntity } from './entitites/work-request-room-type-quantity.entity';
import { WorkRequestWelfareProgramEntity } from './entitites/work-request-welfare-program.entity';
import { WorkRequestEntity } from './entitites/work-request.entity';
import { AddressRepository } from './repositories/address.repository';
import { UserAppointmentRepository } from './repositories/user/user-appointment.repository';
import { UserBeneficiaryInfoRepository } from './repositories/user/user-beneficiary-info.repository';
import { UserProfessionalInfoRepository } from './repositories/user/user-professional-info.repository';
import { UserRatingRepository } from './repositories/user/user-rating.repository';
import { UseRestingDayRepository } from './repositories/user/user-resting-day.repository';
import { UserRepository } from './repositories/user/user.repository';

const ENTITIES = [
    UserEntity,
    UserRatingEntity,
    UserBeneficiaryInfoEntity,
    UserProfessionalInfoEntity,
    UserRestingDayEntity,
    UserAppointmentEntity,
    UserOtpRequestEntity,
    UserGeneratedMediaEntity,
    RoomEntity,
    RoomSolutionEntity,
    WorkRequestRoomToWorkEntity,
    WorkRequestRoomTypeQuantityEntity,
    WorkRequestEntity,
    WorkRequestPrevailingConstructionMaterialEntity,
    WorkRequestWelfareProgramEntity,
    WorkRequestPrecarityEntity,
    AddressEntity,
    ConstructionEntity,
    CostEstimationEntity,
    ContractEntity,
    TechnicalVisitEntity,
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
