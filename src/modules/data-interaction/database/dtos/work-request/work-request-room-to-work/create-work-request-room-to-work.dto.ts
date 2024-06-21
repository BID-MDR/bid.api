import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateRoomDto } from '../../room/create-room.dto';

export class CreateWorkRequestRoomToWorkDto {
    @ApiProperty({ type: CreateRoomDto })
    @ValidateNested()
    @Type(() => CreateRoomDto)
    room: CreateRoomDto;
}
