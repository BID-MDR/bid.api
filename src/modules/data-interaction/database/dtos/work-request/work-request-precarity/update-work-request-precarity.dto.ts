import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CreateWorkRequestPrecarityDto } from './create-work-request-precarity.dto';

export class UpdateWorkRequestPrecarityDto extends IntersectionType(CreateWorkRequestPrecarityDto) {
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    remove: boolean;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    id?: string;
}
