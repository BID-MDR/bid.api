"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const address_entity_1 = require("./entitites/address.entity");
const govbr_sso_entity_1 = require("./entitites/govbr-sso.entity");
const room_solution_entity_1 = require("./entitites/room-solution.entity");
const room_entity_1 = require("./entitites/room.entity");
const technical_visit_entity_1 = require("./entitites/technical-visit.entity");
const user_appointment_entity_1 = require("./entitites/user-appointment.entity");
const user_beneficiary_info_entity_1 = require("./entitites/user-beneficiary-info.entity");
const user_generated_media_entity_1 = require("./entitites/user-generated-media.entity");
const user_otp_request_entity_1 = require("./entitites/user-otp-request.entity");
const user_professional_info_entity_1 = require("./entitites/user-professional-info.entity");
const user_rating_entity_1 = require("./entitites/user-rating.entity");
const user_resting_day_entity_1 = require("./entitites/user-resting-day.entity");
const user_entity_1 = require("./entitites/user.entity");
const address_repository_1 = require("./repositories/address.repository");
const room_repository_1 = require("./repositories/room/room.repository");
const technical_visit_repository_1 = require("./repositories/technical-visit.repository");
const user_appointment_repository_1 = require("./repositories/user/user-appointment.repository");
const user_beneficiary_info_repository_1 = require("./repositories/user/user-beneficiary-info.repository");
const user_generated_media_repository_1 = require("./repositories/user/user-generated-media.repository");
const user_professional_info_repository_1 = require("./repositories/user/user-professional-info.repository");
const user_rating_repository_1 = require("./repositories/user/user-rating.repository");
const user_resting_day_repository_1 = require("./repositories/user/user-resting-day.repository");
const user_repository_1 = require("./repositories/user/user.repository");
const govbr_sso_repository_1 = require("./repositories/govbr-sso.repository");
const govbr_sso_info_to_register_entity_1 = require("./entitites/govbr-sso-info-to-register.entity");
const notification_entity_1 = require("./entitites/notification.entity");
const notification_repository_1 = require("./repositories/notification.repository");
const demand_entity_1 = require("./entitites/demand.entity");
const demand_repository_1 = require("./repositories/user/demand.repository");
const work_request_entity_1 = require("./entitites/work-request.entity");
const message_entity_1 = require("./entitites/message.entity");
const message_repository_1 = require("./repositories/user/message.repository");
const work_request_welfare_entity_1 = require("./entitites/work-request-welfare.entity");
const work_request_repository_1 = require("./repositories/work-request/work-request.repository");
const work_request_welfare_repository_1 = require("./repositories/work-request/work-request-welfare.repository");
const chat_room_entity_1 = require("./entitites/chat-room.entity");
const room_solution_repository_1 = require("./repositories/room/room-solution.repository");
const constructions_entity_1 = require("./entitites/constructions.entity");
const constructions_repository_1 = require("./repositories/constructions.repository");
const help_entity_1 = require("./entitites/help.entity");
const help_repository_1 = require("./repositories/user/help.repository");
const company_entity_1 = require("./entitites/company.entity");
const employee_entity_1 = require("./entitites/employee.entity");
const employee_role_entity_1 = require("./entitites/employee-role.entity");
const company_repository_1 = require("./repositories/company/company.repository");
const employee_repository_1 = require("./repositories/employee/employee.repository");
const employee_role_repository_1 = require("./repositories/employee/employee-role.repository");
const user_repository_2 = require("./repositories/backoffice/user/user.repository");
const user_backoffice_entity_1 = require("./entitites/user-backoffice.entity");
const satisfaction_research_entity_1 = require("./entitites/satisfaction-research.entity");
const satisfaction_research_repository_1 = require("./repositories/satisfaction-research/satisfaction-research.repository");
const user_roles_backoffice_entity_1 = require("./entitites/user-roles-backoffice.entity");
const user_roles_repository_1 = require("./repositories/backoffice/user/user-roles.repository");
const email_repository_1 = require("./repositories/backoffice/email/email.repository");
const message_backoffice_entity_1 = require("./entitites/message-backoffice.entity");
const message_repository_2 = require("./repositories/backoffice/message/message.repository");
const ENTITIES = [
    user_entity_1.UserEntity,
    user_rating_entity_1.UserRatingEntity,
    user_beneficiary_info_entity_1.UserBeneficiaryInfoEntity,
    user_professional_info_entity_1.UserProfessionalInfoEntity,
    user_resting_day_entity_1.UserRestingDayEntity,
    user_appointment_entity_1.UserAppointmentEntity,
    user_otp_request_entity_1.UserOtpRequestEntity,
    user_generated_media_entity_1.UserGeneratedMediaEntity,
    room_entity_1.RoomEntity,
    room_solution_entity_1.RoomSolutionEntity,
    address_entity_1.AddressEntity,
    technical_visit_entity_1.TechnicalVisitEntity,
    govbr_sso_entity_1.GovbrSsoEntity,
    govbr_sso_info_to_register_entity_1.GovbrSsoInfoToRegisterEntity,
    notification_entity_1.NotificationEntity,
    demand_entity_1.DemandEntity,
    work_request_entity_1.WorkRequestEntity,
    message_entity_1.MessageEntity,
    work_request_welfare_entity_1.WorkRequestWelfareEntity,
    chat_room_entity_1.ChatRoomEntity,
    constructions_entity_1.ConstructionsEntity,
    help_entity_1.HelpEntity,
    company_entity_1.CompanyEntity,
    employee_entity_1.EmployeeEntity,
    employee_role_entity_1.EmployeeRoleEntity,
    user_backoffice_entity_1.UserBackofficeEntity,
    satisfaction_research_entity_1.SatisfactionResearchEntity,
    user_roles_backoffice_entity_1.UserRolesBackofficeEntity,
    message_backoffice_entity_1.MessageBackofficeEntity
];
const REPOSITORIES = [
    user_repository_1.UserRepository,
    user_appointment_repository_1.UserAppointmentRepository,
    user_rating_repository_1.UserRatingRepository,
    user_beneficiary_info_repository_1.UserBeneficiaryInfoRepository,
    user_resting_day_repository_1.UseRestingDayRepository,
    user_professional_info_repository_1.UserProfessionalInfoRepository,
    user_generated_media_repository_1.UserGeneratedMediaRepository,
    room_repository_1.RoomRepository,
    room_solution_repository_1.RoomSolutionRepository,
    technical_visit_repository_1.TechnicalVisitRepository,
    address_repository_1.AddressRepository,
    govbr_sso_repository_1.GovbrSsoRepository,
    notification_repository_1.NotificationRepository,
    demand_repository_1.DemandRepository,
    message_repository_1.MessageRepository,
    work_request_repository_1.WorkRequestRepository,
    work_request_welfare_repository_1.WorkRequestWelfateRepository,
    constructions_repository_1.ConstructionsRepository,
    help_repository_1.HelpRepository,
    company_repository_1.CompanyRepository,
    employee_repository_1.EmployeeRepository,
    employee_role_repository_1.EmployeeRoleRepository,
    user_repository_2.UserBackofficeRepository,
    satisfaction_research_repository_1.SatisfactionResearchRepository,
    user_roles_repository_1.UserRolesBackofficeRepository,
    email_repository_1.EmailRepository,
    message_repository_2.MessageBackofficeRepository
];
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature(ENTITIES)],
        providers: REPOSITORIES,
        exports: REPOSITORIES,
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map