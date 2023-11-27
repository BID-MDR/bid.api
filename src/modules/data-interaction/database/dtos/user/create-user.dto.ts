import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @Length(1, 70)
    name: string;
}
