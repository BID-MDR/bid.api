import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';

export class MessageListIdentifierWebsocketDto {

    @ApiProperty()
    @Length(3, 100)
    identifier: string;

}
