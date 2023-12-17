import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsPositive, ValidateNested } from 'class-validator';
import { CreateRoomDto } from '../../room/create-room.dto';

export class CreateWorkRequestRoomTypeQuantityDto {
    @ApiProperty({ type: CreateRoomDto })
    @ValidateNested()
    @Type(() => CreateRoomDto)
    room: CreateRoomDto;

    @ApiProperty()
    @IsPositive()
    quantity: number;
}
