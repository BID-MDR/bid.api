import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UpdateRoomDto } from '../../room/update-room.dto';
import { CreateWorkRequestRoomTypeQuantityDto } from './create-work-request-room-type-quantity.dto';

export class UpdateWorkRequestRoomTypeQuantityDto extends OmitType(PartialType(CreateWorkRequestRoomTypeQuantityDto), [
    'room',
]) {
    @ApiProperty({ type: UpdateRoomDto })
    @ValidateNested()
    @Type(() => UpdateRoomDto)
    @IsOptional()
    room: UpdateRoomDto;
}
