import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { UpdateRoomDto } from '../../room/update-room.dto';
import { CreateWorkRequestRoomTypeQuantityDto } from './create-work-request-room-type-quantity.dto';

export class UpdateWorkRequestRoomTypeQuantityDto{
    @ApiProperty({ type: UpdateRoomDto })
    @ValidateNested()
    @Type(() => UpdateRoomDto)
    @IsOptional()
    room: UpdateRoomDto;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    remove: boolean;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    id?: string;
}
