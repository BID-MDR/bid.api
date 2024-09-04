import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { UserBackofficeEntity } from 'src/modules/data-interaction/database/entitites/user-backoffice.entity';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';

export class MessageBackofficeRegisterRequestDto {
    @ApiProperty()
    @Length(1, 500)
    content: string;

    @ApiProperty()
    @Length(3, 100)
    identifier: string;

    sender: UserBackofficeEntity
    receiver: UserEntity

    client1?:string
    client2?: string

}
