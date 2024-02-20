import { ApiProperty } from '@nestjs/swagger';
import { IsCurrency, IsEnum, IsUUID } from 'class-validator';
import { RoomEntity } from '../../entitites/room.entity';
import { RoomSolutionEnum } from '../../enums/room-solution.enum';

export class CreateRoomSolutionDto {
    @ApiProperty()
    @IsUUID()
    roomId: string;
    room: RoomEntity;

    @ApiProperty({ enum: RoomSolutionEnum })
    @IsEnum(RoomSolutionEnum)
    solution: RoomSolutionEnum;

    @ApiProperty({ type: String })
    @IsCurrency({
        allow_decimal: true,
        digits_after_decimal: [1, 2],
        require_symbol: false,
        allow_negatives: false,
    })
    cost: number;
}
