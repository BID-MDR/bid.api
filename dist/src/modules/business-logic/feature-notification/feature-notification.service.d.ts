import { UserAppointmentRepository } from 'src/modules/data-interaction/database/repositories/user/user-appointment.repository';
import { BaseService } from 'src/core/services/base.service';
import { CreateNotificationDto } from 'src/modules/data-interaction/database/dtos/notification/create-notification.dto';
import { UpdateNotificationDto } from 'src/modules/data-interaction/database/dtos/notification/update-notification.dto';
import { NotificationEntity } from 'src/modules/data-interaction/database/entitites/notification.entity';
import { NotificationRepository } from 'src/modules/data-interaction/database/repositories/notification.repository';
export declare class FeatureNotificationService extends BaseService<NotificationEntity, CreateNotificationDto, UpdateNotificationDto> {
    private notificationRepository;
    private readonly userAppointmentRepository;
    constructor(notificationRepository: NotificationRepository, userAppointmentRepository: UserAppointmentRepository);
    listByUserId(userId: string): Promise<import("../../data-interaction/database/entitites/user-appointment.entity").UserAppointmentEntity[]>;
}
