import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { CreateWorkRequestRoomToWorkDto } from './create-work-request-room-to-work.dto';

export class UpdateWorkRequestRoomToWorkDto extends IntersectionType(CreateWorkRequestRoomToWorkDto) {
    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    remove: boolean;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    id?: string;
}
