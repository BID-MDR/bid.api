import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../entitites/user.entity';

export class NotificationMessageRegisterRequestDto {
    @ApiProperty()
    content: string;

    identifier?: string;

    sender?: UserEntity
    sentAt?: Date
    client1?:string

}
