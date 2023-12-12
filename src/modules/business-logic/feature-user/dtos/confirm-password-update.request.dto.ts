import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class ConfirmPasswordUpdateRequestDto {
    @ApiProperty()
    @Length(4, 4)
    @IsNumberString()
    password: string;
}
