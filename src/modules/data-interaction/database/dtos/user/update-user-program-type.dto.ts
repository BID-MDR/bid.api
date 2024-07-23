import { ApiProperty } from '@nestjs/swagger';
import { UserProgramTypeEnum } from '../../enums/user-program-type.enum';
import { IsEnum } from 'class-validator';

export class UpdateUserProgramTypeDto {

    @ApiProperty({ enum: UserProgramTypeEnum })
    @IsEnum(UserProgramTypeEnum)
    programType: UserProgramTypeEnum;
}
