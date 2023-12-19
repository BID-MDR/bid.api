import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CreateWorkRequestWelfareProgramDto } from './create-work-request-welfare-program.dto';

export class UpdateWorkRequestWelfareProgramDto extends IntersectionType(CreateWorkRequestWelfareProgramDto) {
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    remove: boolean;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    id?: string;
}
