import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class MessageWebsocketRegisterRequestDto {
    @ApiProperty()
    @Length(1, 500)
    content: string;

    @ApiProperty()
    @Length(3, 100)
    identifier: string;
    @ApiProperty()
    @Length(3, 100)
    sender: string
    @ApiProperty()
    @Length(3, 100)
    reciver: string

}
