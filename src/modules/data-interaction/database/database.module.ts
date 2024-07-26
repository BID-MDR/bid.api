import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entitites/address.entity';
import { GovbrSsoEntity } from './entitites/govbr-sso.entity';
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
import { AddressRepository } from './repositories/address.repository';
import { RoomRepository } from './repositories/room/room.repository';
import { TechnicalVisitRepository } from './repositories/technical-visit.repository';
import { UserAppointmentRepository } from './repositories/user/user-appointment.repository';
import { UserBeneficiaryInfoRepository } from './repositories/user/user-beneficiary-info.repository';
import { UserGeneratedMediaRepository } from './repositories/user/user-generated-media.repository';
import { UserProfessionalInfoRepository } from './repositories/user/user-professional-info.repository';
import { UserRatingRepository } from './repositories/user/user-rating.repository';
import { UseRestingDayRepository } from './repositories/user/user-resting-day.repository';
import { UserRepository } from './repositories/user/user.repository';
import { GovbrSsoRepository } from './repositories/govbr-sso.repository';
import { GovbrSsoInfoToRegisterEntity } from './entitites/govbr-sso-info-to-register.entity';

import { NotificationEntity } from './entitites/notification.entity';
import { NotificationRepository } from './repositories/notification.repository';
import { DemandEntity } from './entitites/demand.entity';
import { DemandRepository } from './repositories/user/demand.repository';
import { WorkRequestEntity } from './entitites/work-request.entity';
import { MessageEntity } from './entitites/message.entity';
import { MessageRepository } from './repositories/user/message.repository';
import { WorkRequestWelfareEntity } from './entitites/work-request-welfare.entity';
import { WorkRequestRepository } from './repositories/work-request/work-request.repository';
import { WorkRequestWelfateRepository } from './repositories/work-request/work-request-welfare.repository';

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
    AddressEntity,
    TechnicalVisitEntity,
    GovbrSsoEntity,
    GovbrSsoInfoToRegisterEntity,
    NotificationEntity,
    DemandEntity,
    WorkRequestEntity,
    MessageEntity,
    WorkRequestWelfareEntity
];
const REPOSITORIES = [
    UserRepository,
    UserAppointmentRepository,
    UserRatingRepository,
    UserBeneficiaryInfoRepository,
    UseRestingDayRepository,
    UserProfessionalInfoRepository,
    UserGeneratedMediaRepository,
    RoomRepository,
    TechnicalVisitRepository,
    AddressRepository,
    GovbrSsoRepository,
    NotificationRepository,
    DemandRepository,
    MessageRepository,
    WorkRequestRepository,
    WorkRequestWelfateRepository
];

@Module({
    imports: [TypeOrmModule.forFeature(ENTITIES)],
    providers: REPOSITORIES,
    exports: REPOSITORIES,
})
export class DatabaseModule {}
