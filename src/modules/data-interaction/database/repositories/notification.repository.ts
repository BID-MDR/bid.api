import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '../dtos/notification/create-notification.dto';
import { UpdateNotificationDto } from '../dtos/notification/update-notification.dto';
import { NotificationEntity } from '../entitites/notification.entity';

@Injectable()
export class NotificationRepository extends BaseRepository<
    NotificationEntity,
    CreateNotificationDto,
    UpdateNotificationDto
> {
    constructor(@InjectRepository(NotificationEntity) private repository: Repository<NotificationEntity>) {
        super(repository);
    }
}
