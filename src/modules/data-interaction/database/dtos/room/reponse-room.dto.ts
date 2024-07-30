import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Type } from "class-transformer";
import { ResponseRoomSolutionDto } from "../room-solution/response-room-solution.dto";

@Exclude()
export class RoomResponseDto {
    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    @Type(() => String)
    type: string;

    @ApiProperty({ type: () => ResponseRoomSolutionDto, isArray: true })
    @Expose()
    @Type(() => ResponseRoomSolutionDto)
    roomSolutions: ResponseRoomSolutionDto[];
}
