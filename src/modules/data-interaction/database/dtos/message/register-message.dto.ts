import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { UserEntity } from '../../entitites/user.entity';

export class MessageRegisterRequestDto {
    @ApiProperty()
    @Length(1, 500)
    content: string;

    @ApiProperty()
    @Length(3, 100)
    identifier: string;

    sender: UserEntity
    receiver: UserEntity

    client1?:string
    client2?: string

}
