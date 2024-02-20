import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { WelfareProgramEnum } from '../../../enums/welfare-program.enum';

export class CreateWorkRequestWelfareProgramDto {
    @ApiProperty({ enum: WelfareProgramEnum })
    @IsEnum(WelfareProgramEnum)
    welfareProgram: WelfareProgramEnum;
}
