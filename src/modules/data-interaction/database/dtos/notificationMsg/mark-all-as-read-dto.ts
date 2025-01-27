import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../entitites/user.entity';

export class NotificationMessageMarkAllAsReadDto {
    @ApiProperty()
    notificationIds: string[];
}
