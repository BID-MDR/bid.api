import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsEnum, IsUUID } from 'class-validator';
import { RoomEntity } from '../../entitites/room.entity';
import { RoomSolutionEnum } from '../../enums/room-solution.enum';

export class CreateRoomSolutionDto {
    @ApiProperty()
    @IsUUID()
    roomId: string;

    @ApiProperty()
    room: RoomEntity;

    @ApiProperty({ enum: RoomSolutionEnum })
    @IsEnum(RoomSolutionEnum)
    solution: RoomSolutionEnum;

}
