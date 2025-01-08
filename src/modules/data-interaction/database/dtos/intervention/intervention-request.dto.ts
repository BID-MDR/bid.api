import { ApiProperty } from "@nestjs/swagger";
import {IsString} from "class-validator";
import { RoomEntity } from "../../entitites/room.entity";


export class CreateInterventionRequestDto {
    @ApiProperty()
    roomId?: string;


    room?: RoomEntity;

    
    @ApiProperty()
    @IsString()
    value: string;

    // @ApiProperty({ type: CreateRoomDto, isArray: true })
    // @ValidateNested({ each: true })
    // @Type(() => CreateRoomDto)
    // room: CreateRoomDto[];

}
