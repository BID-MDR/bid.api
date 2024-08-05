import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class HelpRegisterRequestDto {
    @ApiProperty()
    @Length(1, 500)
    content: string;

    sentAt: Date
    user:any


}
