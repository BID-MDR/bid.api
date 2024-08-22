import { ApiProperty } from "@nestjs/swagger";
import { RoomEntity } from "../../entitites/room.entity";
import { IsOptional, IsUUID } from "class-validator";
import { RoomSolutionEnum } from "../../enums/room-solution.enum";
import { WorkRequestEntity } from "../../entitites/work-request.entity";

export class RequestRoomSolutionDto {

    @ApiProperty()
    @IsOptional()
    roomId: string;

    @ApiProperty()
    @IsOptional()
    room: RoomEntity;

    @ApiProperty()
    solution: Array<RoomSolutionEnum>;

    @ApiProperty()
    @IsUUID()
    workRequestId: string;
    workRequest: WorkRequestEntity;

}