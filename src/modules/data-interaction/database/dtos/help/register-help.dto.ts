import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { UserProgramTypeEnum } from '../../enums/user-program-type.enum';

export class HelpRegisterRequestDto {
    @ApiProperty()
    @Length(1, 500)
    content: string;

    sentAt: Date
    user:any

    @ApiProperty({ enum: UserProgramTypeEnum })
    @IsEnum(UserProgramTypeEnum)
    programType: UserProgramTypeEnum;
}
