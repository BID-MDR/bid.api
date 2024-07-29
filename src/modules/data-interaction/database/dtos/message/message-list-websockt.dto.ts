import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';

export class MessageListWebsocketDto {


    @ApiProperty()
    @Length(3, 100)
    client1: string;

    @ApiProperty()
    @Length(3, 100)
    client2: string;

}
