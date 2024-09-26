"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureNotificationService = void 0;
const user_appointment_repository_1 = require("../../data-interaction/database/repositories/user/user-appointment.repository");
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../../core/services/base.service");
const notification_repository_1 = require("../../data-interaction/database/repositories/notification.repository");
let FeatureNotificationService = class FeatureNotificationService extends base_service_1.BaseService {
    notificationRepository;
    userAppointmentRepository;
    constructor(notificationRepository, userAppointmentRepository) {
        super(notificationRepository);
        this.notificationRepository = notificationRepository;
        this.userAppointmentRepository = userAppointmentRepository;
    }
    async listByUserId(userId) {
        return await this.userAppointmentRepository.listByUserId(userId);
    }
};
exports.FeatureNotificationService = FeatureNotificationService;
exports.FeatureNotificationService = FeatureNotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_repository_1.NotificationRepository,
        user_appointment_repository_1.UserAppointmentRepository])
], FeatureNotificationService);
//# sourceMappingURL=feature-notification.service.js.map