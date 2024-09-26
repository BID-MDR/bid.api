import { Request } from 'express';
import { CreateNotificationDto } from 'src/modules/data-interaction/database/dtos/notification/create-notification.dto';
import { UpdateNotificationDto } from 'src/modules/data-interaction/database/dtos/notification/update-notification.dto';
import { FeatureNotificationService } from './feature-notification.service';
export declare class FeatureNotificationController {
    private featureNotificationService;
    constructor(featureNotificationService: FeatureNotificationService);
    listLogged(req: Request): Promise<import("../../data-interaction/database/entitites/user-appointment.entity").UserAppointmentEntity[]>;
    getById(id: string): Promise<import("../../data-interaction/database/entitites/notification.entity").NotificationEntity>;
    create(body: CreateNotificationDto): Promise<import("../../data-interaction/database/entitites/notification.entity").NotificationEntity>;
    update(req: Request, body: UpdateNotificationDto): Promise<import("../../data-interaction/database/entitites/notification.entity").NotificationEntity>;
}
